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
const { errors } = require('celebrate');

// --- Load environment variables ---
// IMPORTANT: Load environment variables **before** anything else!
dotenv.config({ path: './.env' });

// --- Check for MONGODB_URI ---
const mongodbUri = process.env.MONGODB_URI;  // Get the variable *immediately* after dotenv.config()
if (!mongodbUri) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1); // Exit if the URI is missing
}

// --- Express app setup ---
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Apply JWT middleware to all routes *except* those that don't need authentication
app.use((req, res, next) => {
  if (['/api/auth/register', '/api/auth/login'].includes(req.path)) {
    return next();
  }
  jwtMiddleware(req, res, next);
});
app.use('/api/auth', authRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.get('/', (_, res) => {
  res.send('Hello from the P2P Project!');
});

export default app;