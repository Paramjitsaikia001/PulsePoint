const express = require('express');
const { createBloodRequest, getBloodRequests } = require('../controllers/bloodRequestController'); // Ensure these are imported correctly
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', authenticateUser, createBloodRequest); // Attach the handler
// Attach the handler

module.exports = router;