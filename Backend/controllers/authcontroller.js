const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

// Helper Functions
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id, email: user.email, isDonor: user.isDonor }, jwtSecretKey, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, jwtRefreshSecretKey, { expiresIn: '7d' });
};

//  Helper function to store the *hashed* refresh token in the database.
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
        const {
            name,
            userId,
            email,
            phoneNo,
            age,
            location,
            isDonor,
            bloodType,
            medicalHistory,
            medicalHistoryDescription,
            lastBloodDonation,
            availability,
            notificationsOn,
            chatGptUses,
            password,
        } = req.body;

        // Validate required fields
        if (!name || !userId || !email || !password) {
            return res.status(400).json({ message: 'Name, User ID, Email, and Password are required.' });
        }

        // If the user is a donor, validate donor-specific fields
        if (isDonor) {
            if (!bloodType) {
                return res.status(400).json({ message: 'Blood Type is required for donors.' });
            }
            if (!['yes', 'no'].includes(medicalHistory?.toLowerCase())) {
                return res.status(400).json({ message: 'Medical History must be "Yes" or "No".' });
            }
            if (medicalHistory === 'yes' && !medicalHistoryDescription) {
                return res.status(400).json({ message: 'Please describe your medical history.' });
            }
            if (!lastBloodDonation || !availability) {
                return res.status(400).json({ message: 'Last Blood Donation and Availability are required for donors.' });
            }
        }


        const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User ID or Email already exists.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new User({
            name,
            userId,
            email,
            phoneNo,
            age,
            location,
            isDonor,
            bloodType,
            medicalHistory,
            medicalHistoryDescription,
            lastBloodDonation,
            availability,
            notificationsOn,
            chatGptUses,
            password: hashedPassword,
        });

        // Store the user
        const savedUser = await newUser.save();

        // Generate tokens
        const accessToken = generateAccessToken(savedUser);
        const refreshToken = generateRefreshToken(savedUser);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await storeRefreshToken(savedUser._id, hashedRefreshToken);

        res.status(201).json({
            message: 'User registered successfully.',
            user: savedUser,
            token: accessToken,
            refreshToken: refreshToken
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed: ' + error.message }); // Include the error message
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await storeRefreshToken(user._id, hashedRefreshToken);


        res.status(200).json({
            message: 'Login successful.',
            token: accessToken,
            refreshToken: refreshToken,
            user: {
                name: user.name,
                email: user.email,
                userId: user.userId,
                isDonor: user.isDonor,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed: ' + error.message }); // Include error message
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, jwtRefreshSecretKey);
        const userId = decoded.userId;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isRefreshTokenValid) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }


        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
        await storeRefreshToken(userId, hashedNewRefreshToken);

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

    } catch (error) {
        console.error("Refresh error", error);
        return res.status(401).json({ message: 'Refresh token is invalid or expired' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to retrieve users: ' + error.message }); // Include error message.
    }
};
