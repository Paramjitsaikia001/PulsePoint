const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jwt for token generation

// In-memory storage for users (replace with your actual data storage)
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
      password,
    } = req.body;

    if (!name || !userId || !email || !password) {
      return res.status(400).json({ message: 'Name, User ID, Email, and Password are required.' });
    }

    if (isDonor === 'true' || isDonor === true) {
      if (!bloodType) {
        return res.status(400).json({ message: 'Blood Type is required for donors.' });
      }
      if (
        medicalHistory === undefined ||
        medicalHistory === null ||
        (typeof medicalHistory === 'string' &&
          medicalHistory.toLowerCase() !== 'yes' &&
          medicalHistory.toLowerCase() !== 'no')
      ) {
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

    if (users[userId] || Object.values(users).some((user) => user.email === email)) {
      return res.status(409).json({ message: 'User ID or Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    res.status(500).json({ message: 'Registration failed.' });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    const allUsers = Object.values(users); // Assuming `users` is the in-memory storage
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required.' });
    }

    const user = Object.values(users).find((user) => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.userId }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
};
