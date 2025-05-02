const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bloodRoutes = require('./routes/blood');
const shopkeeperRoutes = require('./routes/shopkeeper');
const prescriptionRoutes = require('./routes/prescription');
const { jwtMiddleware } = require('./middleware/authMiddleware');
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
    res.send('Hello from the P2P Project!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
