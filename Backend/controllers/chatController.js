const Chat = require('../models/chatModel');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newMessage = new Chat({ senderId, receiverId, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully.', chat: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
};

// Get chat history between two users
exports.getChatHistory = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;

        const chatHistory = await Chat.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        }).sort({ timestamp: 1 }); // Sort messages by timestamp

        res.status(200).json(chatHistory);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Failed to fetch chat history.' });
    }
};