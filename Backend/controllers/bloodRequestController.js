const BloodRequest = require('../models/bloodRequestModel.js');

// Create a blood request
exports.createBloodRequest = async (req, res) => {
    try {
        const { bloodGroup, location, urgency } = req.body;

        if (!bloodGroup || !location || !urgency) {
            return res.status(400).json({ message: 'Blood group, location, and urgency are required.' });
        }

        const newRequest = new BloodRequest({
            userId: req.user.id,
            bloodGroup,
            location,
            urgency,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Blood request created successfully.', request: newRequest });
    } catch (error) {
        console.error('Error creating blood request:', error);
        res.status(500).json({ message: 'Failed to create blood request.' });
    }
};

// Get all blood requests
exports.getBloodRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching blood requests:', error);
        res.status(500).json({ message: 'Failed to fetch blood requests.' });
    }
};
