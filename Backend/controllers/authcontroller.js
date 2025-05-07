const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Example of an in-memory storage for users (you should replace it with your database logic)
let users = [];

const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.registerUser = async (req, res) => {
  try {
    // Extracting data from the request body
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
      password,
    } = req.body;

    // Validate required fields
    if (!name || !userId || !email || !password) {
      return res.status(400).json({ message: 'Name, User ID, Email, and Password are required.' });
    }

    // If the user is a donor, validate donor-specific fields
    if (isDonor) {
      if (!bloodType) {
        return res.status(400).json({ message: 'Blood Type is required for donors.' });
      }
      if (!['yes', 'no'].includes(medicalHistory?.toLowerCase())) {
        return res.status(400).json({ message: 'Medical History must be "Yes" or "No".' });
      }
      if (medicalHistory === 'yes' && !medicalHistoryDescription) {
        return res.status(400).json({ message: 'Please describe your medical history.' });
      }
      if (!lastBloodDonation || !availability) {
        return res.status(400).json({ message: 'Last Blood Donation and Availability are required for donors.' });
      }
    }

    // Check if the user already exists by userId or email
    const existingUser = users.find(user => user.userId === userId || user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User ID or Email already exists.' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
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

    // Store the user (replace with database logic)
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed.' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required.' });
    }

    // Find the user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, jwtSecretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        name: user.name,
        email: user.email,
        userId: user.userId,
        isDonor: user.isDonor,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    // Replace with actual DB query
    res.status(200).json(users); // Return all users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
};
