const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    role: { type: String, required: true, enum: ['recipient', 'donor', 'shopkeeper'] },
});

module.exports = mongoose.model('User', userSchema);