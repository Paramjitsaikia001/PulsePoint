// models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expiryDate: Date,
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  description: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
