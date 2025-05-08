// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  bloodGroup: String,
  location: {
    lat: Number,
    lng: Number,
  },
  isSeen: { type: Boolean, default: false },
  type: { type: String, enum: ['blood_request', 'medicine_update', 'general'] },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
