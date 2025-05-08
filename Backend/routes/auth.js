const express = require('express');
const router = express.Router();
const Authrouter = router;
const authController = require('../controllers/authcontroller.js');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware.js');

// Route to register a new user (no authentication needed)
Authrouter.post('/register', authController.registerUser);

// Route for user login (no authentication needed)
Authrouter.post('/login', authController.loginUser);

// Route to refresh token (no authentication needed)
Authrouter.post('/refresh', authController.refreshToken);

// Route to get all users (protected, admin role required)
Authrouter.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);

// Route to check if email or phone exists
Authrouter.post('/check-existence', authController.checkExistence);

// Route to get user profile (protected)
Authrouter.get('/profile', authenticateUser, authController.getUserProfile);

module.exports = Authrouter;
