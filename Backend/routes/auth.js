const express = require('express');
const Authrouter = express.Router();
const authController = require('../controllers/authcontroller.js');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware.js');

// Routes without authentication
Authrouter.post('/register', authController.registerUser);
Authrouter.post('/login', authController.loginUser);
Authrouter.post('/refresh', authController.refreshToken); 

// Routes with authentication
Authrouter.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);

module.exports = Authrouter;
