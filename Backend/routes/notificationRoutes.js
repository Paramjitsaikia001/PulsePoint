const express = require('express');
const Notification = require('../models/Notification.js');
const { authenticateUser } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Get notifications for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.auth._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications.' });
    }
});

module.exports = router;