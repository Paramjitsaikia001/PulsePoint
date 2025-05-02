const express = require('express');
const bloodRouter = express.Router();
const bloodRequestController = require('../bloodRequestController.js');
const { authenticateUser } = require('../middleware/authMiddleware'); 

bloodRouter.get('/search', bloodRequestController.searchBloodRequests);
bloodRouter.post('/request', authenticateUser, bloodRequestController.createBloodRequest);
console.log('Blood requests route is running');

module.exports = bloodRouter;