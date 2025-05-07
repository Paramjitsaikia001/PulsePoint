const express = require('express');
const { registerUser, loginUser } = require('../controllers/authcontroller.js'); // Ensure these are imported correctly
const router = express.Router();
const authController = require('../controllers/authcontroller.js');
const { authenticateUser, authorizeAdmin, jwtMiddleware } = require('../middleware/authMiddleware.js');

// Apply jwtMiddleware globally to all routes except the excluded ones
router.use(jwtMiddleware);

// Route to register a new user (no authentication needed)
router.post('/register', registerUser); // Attach the handler

// Route to get all users (protected, admin role required)
router.get('/users', authenticateUser, authorizeAdmin, authController.getAllUsers);

// Route for user login (no authentication needed)
router.post('/login', loginUser); // Attach the handler

// Example of a properly defined middleware
router.use((req, res, next) => {
    console.log('Middleware executed');
    next();
});

// Example of a valid route
router.get('/example', (req, res) => {
    res.send('Example route');
});

// Your route handlers here
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Middleware logic here
router.use((req, res, next) => {
    next();
});

module.exports = router;
