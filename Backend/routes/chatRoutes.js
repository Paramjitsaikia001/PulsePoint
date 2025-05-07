const express = require('express');
const Chat = require('../models/chatModel');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', authenticateUser, async (req, res) => {
  const { receiverId, message } = req.body;

  if (!receiverId || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newMessage = new Chat({
      senderId: req.user.id,
      receiverId,
      message,
    });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully.', chat: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

router.get('/history/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const chatHistory = await Chat.find({
      $or: [
        { senderId: req.user.id, receiverId: userId },
        { senderId: userId, receiverId: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat history.' });
  }
});

module.exports = router;