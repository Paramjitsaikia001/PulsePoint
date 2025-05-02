const express = require('express');
const Authrouter = express.Router();
const authController = require('../authcontroller.js');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware'); // Import the middleware

// Route to register a new user (no authentication needed)
Authrouter.post('/register', authController.registerUser);

// Route to get all users (protected, admin role required)
Authrouter.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);

// Route for user login (no authentication needed)
//Authrouter.post('/login', authController.loginUser);

module.exports = Authrouter;
