import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Chat = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/chat/history/${receiverId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchMessages();
    }, [receiverId]);

    const handleSendMessage = async () => {
        try {
            const response = await api.post('/chat/send', { receiverId, message: newMessage });
            setMessages([...messages, response.data.chat]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.senderId === 'me' ? 'sent' : 'received'}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;