const express = require('express');
const authRoutes = require('./routes/auth.js');
const bloodRoutes = require('./routes/blood.js');
const shopkeeperRoutes = require('./routes/shopkeeper.js');
const prescriptionRoutes = require('./routes/prescription.js');
const chatRoutes = require('./routes/chatRoutes.js');
const { jwtMiddleware } = require('./middleware/authMiddleware.js');
const dotenv = require('dotenv');

const app = express();

dotenv.config({
  path: './.env', // Load environment variables from .env file
});

app.use(express.json());



// Apply JWT middleware to all routes *except* those that don't need authentication
app.use((req, res, next) => {
  const publicRoutes = ['/api/auth/register', '/api/auth/login'];
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  jwtMiddleware(req, res, next);
});
app.use('/api/auth', authRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (_, res) => {
  res.send('Hello from the P2P Project!');
});


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Authorization token is missing or invalid.' });
  }
  next(err);
});
module.exports = { app };