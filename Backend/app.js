const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

// --- Load environment variables ---
// IMPORTANT: Load environment variables **before** anything else!
dotenv.config({ path: './.env' });

// --- Check for MONGODB_URI ---
const mongodbUri = process.env.MONGODB_URI;  // Get the variable *immediately* after dotenv.config()
if (!mongodbUri) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1); // Exit if the URI is missing
}

// --- Express app setup ---
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rate Limiting ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/', limiter);


const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\n MongoDB connected !! DB HOST: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MONGODB connection FAILED: ', error);
    process.exit(1);
  }
};
connectDB();


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'donor', 'admin'], default: 'user' },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dob: { type: Date },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    isDonor: { type: Boolean, default: false },
    donorEligibility: {
      type: new mongoose.Schema(
        {
          ageBetween18to60: Boolean,
          haemoglobinAbove12_5: Boolean,
          pulseBetween50to100: Boolean,
          bloodPressureNormal: Boolean,
          temperatureNormal: Boolean,
          rabiesOrHepatitisBInLastYear: Boolean,
          tattooOrMajorSurgeryIn6Months: Boolean,
          malariaOrBloodDonationIn3Months: Boolean,
          immunizationsIn1Month: Boolean,
          antibioticsIn48Hours: Boolean,
          alcoholIn24Hours: Boolean,
          dentalOrAspirinIn72Hours: Boolean,
          coldOrCoughNow: Boolean,
          pregnantOrBreastFeeding: Boolean,
          menstruationCycle: Boolean,
          diabetesOrHeartDisease: Boolean,
          unexplainedFeverWeightLoss: Boolean,
          tbOrAsthmaOrLiverDisease: Boolean,
          hivOrBloodClottingDisorders: Boolean,
        },
        { _id: false }
      ),
      default: {},
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// --- JWT Middleware ---
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: 'Token expired' });
        } else {
          return res.status(403).json({ message: 'Invalid token' });
        }
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authentication required: Token missing.' });
  }
};

// --- Authorization Middleware ---
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized: Insufficient permissions.' });
    }
  };
};

// --- Helper functions ---
const generateAccessToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

const generateRefreshToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });

const storeRefreshToken = async (userId, hashedToken) => {
  await User.updateOne({ _id: userId }, { $set: { refreshToken: hashedToken } });
};

const clearRefreshToken = async (userId) => {
  await User.updateOne({ _id: userId }, { $set: { refreshToken: null } });
};

// --- Authentication Routes ---
app.post(
  '/api/auth/register',
  [
    body('name').notEmpty().trim().escape().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').notEmpty().trim().escape().withMessage('Phone number is required'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender value'),
    body('dob').optional().isISO8601().toDate().withMessage('Invalid date format'),
    body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
    body('isDonor').optional().isBoolean().withMessage('Invalid boolean value'),
    body('donorEligibility.*').optional().isBoolean().withMessage('All donor eligibility fields must be boolean'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, phone, gender, dob, bloodGroup, isDonor, donorEligibility } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return res.status(409).json({ message: 'Email or phone already in use.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        gender,
        dob,
        bloodGroup,
        isDonor,
        donorEligibility,
      });

      const savedUser = await newUser.save();
      const accessToken = generateAccessToken(savedUser);
      const refreshToken = generateRefreshToken(savedUser);
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await storeRefreshToken(savedUser._id, hashedRefreshToken);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role,
          phone: savedUser.phone,
          gender: savedUser.gender,
          dob: savedUser.dob,
          bloodGroup: savedUser.bloodGroup,
          isDonor: savedUser.isDonor,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  '/api/auth/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await storeRefreshToken(user._id, hashedRefreshToken);

      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob,
          bloodGroup: user.bloodGroup,
          isDonor: user.isDonor,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const hashedRefreshTokenFromRequest = await bcrypt.hash(refreshToken, 10);
    if (user.refreshToken !== hashedRefreshTokenFromRequest) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await storeRefreshToken(userId, hashedNewRefreshToken);

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Refresh error", error);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required for logout' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    if (user.refreshToken !== hashedRefreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    await clearRefreshToken(userId);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed: ' + error.message });
  }
});

app.get('/api/auth/users', authenticateJWT, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'Protected resource accessed', user: req.user });
});

app.get('/', (req, res) => {
  res.send('P2P Project API');
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: 'Invalid JWT token' });
  }
  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ message: 'JWT token expired' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: 'Validation error: ' + err.message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid data format: ' + err.message });
  }
  res.status(500).json({ message: 'Internal server error: ' + err.message });
});

// --- Server Startup ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
