const BloodRequest = require('../models/BloodRequest'); // Adjust the path to your BloodRequest model

exports.createBloodRequest = async (req, res) => {
    try {
        const { userId, bloodType, location } = req.body;

        console.log('Blood Request Data:', req.body);

        // --- Mandatory Field Validation for Blood Requests ---
        if (!userId || !bloodType || !location) {
            return res.status(400).json({ message: 'User ID, Blood Type, and Location are required for a blood request.' });
        }

        // --- Here you would typically: ---
        // 1. Verify if the userId exists in your registered users.
        // 2. Save the blood request details to your database.
        // 3. Potentially trigger notifications to matching blood donors.

        // --- For now, just send a success response ---
        const newBloodRequest = {  // create a new object for the blood request
            userId,
            bloodType,
            location
        }
        res.status(201).json({ message: 'Blood request submitted successfully!', requestDetails: newBloodRequest });

    } catch (error) {
        console.error('Error creating blood request:', error);
        res.status(500).json({ message: 'Failed to submit blood request.' });
    }
};

exports.searchBloodRequests = async (req, res) => {
    try {
        const { bloodType, location } = req.query; // Get parameters from query string

        // Build the query. This is an example for MongoDB. Adapt for your database.
        const query = {}; // Start with an empty query object

        if (bloodType) {
            query.bloodType = bloodType;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' }; // Example: Case-insensitive search
        }

        const bloodRequests = await BloodRequest.find(query); // Execute the query
        res.status(200).json(bloodRequests); // Send the results
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching for blood requests.' });
    }
};
