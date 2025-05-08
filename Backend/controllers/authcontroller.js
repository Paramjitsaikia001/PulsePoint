const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "15m" } // Token expiration
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, jwtRefreshSecretKey, { expiresIn: '7d' });
};

const storeRefreshToken = async (userId, hashedToken) => {
  try {
    await User.updateOne({ _id: userId }, { $set: { refreshToken: hashedToken } });
  } catch (error) {
    console.error("Error storing refresh token:", error);
    throw error;
  }
};

exports.registerUser = async (req, res) => {
  try {
    console.log("Incoming registration data:", req.body);

    const { name, username, email, password, phone, gender, dob, bloodGroup, isDonor, donorEligibility, role } = req.body;

    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "Name, Username, Email, Password, and Phone are required." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email, phone number, or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      bloodGroup,
      isDonor,
      donorEligibility: isDonor ? donorEligibility : null,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await storeRefreshToken(user._id, hashedRefreshToken);

    res.status(200).json({
      message: "Login successful.",
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    const newAccessToken = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid or expired refresh token." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users: ' + error.message });
  }
};

exports.checkExistence = async (req, res) => {
  try {
    const { email, phone, username } = req.body;

    if (!email && !phone && !username) {
      return res.status(400).json({ message: "Email, phone, or username is required." });
    }

    const emailExists = email ? await User.findOne({ email }) : null;
    const phoneExists = phone ? await User.findOne({ phone }) : null;
    const usernameExists = username ? await User.findOne({ username }) : null;

    res.status(200).json({
      emailExists: !!emailExists,
      phoneExists: !!phoneExists,
      usernameExists: !!usernameExists,
    });
  } catch (error) {
    console.error("Error checking existence:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.auth._id; // Assuming `req.auth` contains the authenticated user's ID
    const user = await User.findById(userId).select("-password -refreshToken"); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};