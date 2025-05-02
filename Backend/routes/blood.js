const express = require('express');
const bloodRouter = express.Router();
const bloodRequestController = require('../controllers/bloodRequestController.js');
const { authenticateUser } = require('../middleware/authMiddleware.js'); // Import the middleware

bloodRouter.get('/search', bloodRequestController.searchBloodRequests);
bloodRouter.post('/request', authenticateUser, bloodRequestController.createBloodRequest);
console.log('Blood requests route is running');

module.exports = bloodRouter;