// --- Imports ---
const express = require('express');
const authRoutes = require('./routes/auth');
const bloodRoutes = require('./routes/blood');
const shopkeeperRoutes = require('./routes/shopkeeper');
const prescriptionRoutes = require('./routes/prescription');
const notificationRoutes = require('./routes/notificationRoutes.js');
const { jwtMiddleware } = require('./middleware/authMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config({
  path: './.env', // Load environment variables from .env file
});

// Allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));

// Parse JSON request bodies
app.use(express.json());

// Apply JWT middleware to all routes *except* those that don't need authentication
app.use((req, res, next) => {
  if (['/api/auth/register', '/api/auth/login'].includes(req.path)) {
    return next();
  }
  jwtMiddleware(req, res, next);
});

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (_, res) => {
  res.send('Hello from the P2P Project!');
});

// Error handling middleware for unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Authorization token is missing or invalid.' });
  }
  next(err);
});

module.exports = { app };
