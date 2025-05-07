const express = require('express');
const BloodRequest = require('../models/bloodRequestModel.js');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Submit a blood request
router.post('/request', authenticateUser, async (req, res) => {
    const { bloodGroup, location, urgency } = req.body;

    if (!bloodGroup || !location || !urgency) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newRequest = new BloodRequest({
            userId: req.user.id,
            bloodGroup,
            location,
            urgency,
        });
        await newRequest.save();

        res.status(201).json({ message: 'Blood request submitted successfully.', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit blood request.' });
    }
});

// Get all blood requests (for donors)
router.get('/requests', authenticateUser, authorizeRole('donor'), async (req, res) => {
    try {
        const requests = await BloodRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blood requests.' });
    }
});

// Respond to a blood request
router.post('/respond/:id', authenticateUser, authorizeRole('donor'), async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;

    try {
        const request = await BloodRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        request.responses.push({ donorId: req.user.id, response });
        await request.save();

        res.status(200).json({ message: 'Response submitted successfully.', request });
    } catch (error) {
        res.status(500).json({ message: 'Failed to respond to blood request.' });
    }
});

module.exports = router;