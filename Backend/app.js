// --- Imports ---
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
const { jwtMiddleware, jwtErrorHandler } = require('./middleware/authMiddleware');

// --- Load environment variables ---
dotenv.config({ path: './.env' });

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
});
app.use('/api/auth/', limiter);

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not defined');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected at ${mongoose.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// --- User Schema ---
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
      type: new mongoose.Schema({
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
      }, { _id: false }),
      default: {},
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// --- Helper Functions ---
const generateAccessToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

const storeRefreshToken = async (userId, hashedToken) => {
  await User.updateOne({ _id: userId }, { $set: { refreshToken: hashedToken } });
};

// --- Authentication Routes ---
app.post('/api/auth/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('phone').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, phone, role, gender, dob, bloodGroup, isDonor, donorEligibility } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(409).json({ message: 'Email or phone already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name, email, password: hashedPassword, phone, role, gender, dob, bloodGroup, isDonor, donorEligibility,
    });

    const savedUser = await newUser.save();

    const accessToken = generateAccessToken(savedUser);
    const refreshToken = generateRefreshToken(savedUser);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await storeRefreshToken(savedUser._id, hashedRefreshToken);

    res.status(201).json({
      message: 'User registered',
      user: { _id: savedUser._id, name, email, role, phone },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

app.post('/api/auth/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await storeRefreshToken(user._id, hashedRefreshToken);

    res.json({
      message: 'Login successful',
      user: { _id: user._id, name: user.name, email, role: user.role, phone: user.phone },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// --- Apply JWT Middleware ---
app.use(jwtMiddleware);

// --- Error and 404 Handling ---
app.use(jwtErrorHandler); // Handle JWT errors
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// --- Graceful Shutdown ---
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('\nDisconnected MongoDB. Server shutting down.');
  process.exit(0);
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app };
