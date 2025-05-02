const express = require('express');
const Authrouter = express.Router();
const authController = require('../controllers/authcontroller.js');
const { authenticateUser, authorizeAdmin, jwtMiddleware } = require('../middleware/authMiddleware.js');

// Apply jwtMiddleware globally to all routes except the excluded ones
Authrouter.use(jwtMiddleware);

// Route to register a new user (no authentication needed)
Authrouter.post('/register', authController.registerUser);

// Route to get all users (protected, admin role required)
Authrouter.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);

// Route for user login (no authentication needed)
Authrouter.post('/login', authController.loginUser);

module.exports = Authrouter;
