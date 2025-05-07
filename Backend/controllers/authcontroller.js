const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
dotenv.config();

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { fullname, username, email, password, phone, dob, gender, role } = req.body;

    // Validate required fields
    if (!fullname || !username || !email || !password || !phone || !dob || !gender || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the role is valid
    const validRoles = ['recipient', 'donor', 'shopkeeper'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid role. Allowed roles are: ${validRoles.join(', ')}` });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful.', token, role: user.role });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get all users
exports.getAllUsers = (req, res) => {
  try {
    console.log('Request body:', req.body);
    User.find({}, (err, users) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Failed to retrieve users.' });
      }
      res.status(200).json(users);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
};
