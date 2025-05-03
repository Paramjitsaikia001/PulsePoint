const express = require('express');
const authRoutes = require('./routes/auth');
const bloodRoutes = require('./routes/blood');
const shopkeeperRoutes = require('./routes/shopkeeper');
const prescriptionRoutes = require('./routes/prescription');
const { jwtMiddleware } = require('./middleware/authMiddleware');
const dotenv = require('dotenv'); 

const app = express();

dotenv.config({
    path: './.env', // Load environment variables from .env file
});

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