
// const jwt = require('jsonwebtoken');  //  You'll use this later for login
// const User = require('../models/User'); // Remove this line

//  In-memory storage for users (replace with your actual data storage)
const users = {};

exports.registerUser = async (req, res) => {
    try {
        const {
            name,
            userId,
            email,
            phoneNo,
            age,
            location,
            isDonor,
            bloodType,
            medicalHistory,
            medicalHistoryDescription,
            lastBloodDonation,
            availability,
            notificationsOn,
            chatGptUses,
            password
        } = req.body;

        console.log('Registration Data:', req.body);

        
        if (!name || !userId || !email || !password) {
            return res.status(400).json({ message: 'Name, User ID, Email, and Password are required.' });
        }

        
         if (isDonor === 'true' || isDonor === true) {
            if (!bloodType) {
                return res.status(400).json({ message: 'Blood Type is required for donors.' });
            }
            if (medicalHistory === undefined || medicalHistory === null || (typeof medicalHistory === 'string' && medicalHistory.toLowerCase() !== 'yes' && medicalHistory.toLowerCase() !== 'no')) {
                return res.status(400).json({ message: 'Medical History (Yes/No) is required for donors.' });
            }
            if (medicalHistory === 'yes' && !medicalHistoryDescription) {
                return res.status(400).json({ message: 'Please describe your medical history.' });
            }
            if (!lastBloodDonation) {
                return res.status(400).json({ message: 'Last Blood Donation date is required for donors.' });
            }
            if (!availability) {
                return res.status(400).json({ message: 'Availability information is required for donors.' });
            }
        }

        
        if (users[userId] || Object.values(users).some(user => user.email === email)) {
            return res.status(409).json({ message: 'User ID or Email already exists.' });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        // --- Store user data (IN MEMORY - replace with Firebase) ---
        const newUser = {
            name,
            userId,
            email,
            phoneNo,
            age,
            location,
            isDonor,
            bloodType,
            medicalHistory,
            medicalHistoryDescription,
            lastBloodDonation,
            availability,
            notificationsOn,
            chatGptUses,
            password: hashedPassword, 
        };
        users[userId] = newUser; 

        
        res.status(201).json({ message: 'User registered successfully.', user: newUser });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed.' })
    }
};
