// models/Shop.js
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shopName: String,
  address: String,
  contactEmail: String,
  contactPhone: String,
  location: {
    lat: Number,
    lng: Number
  },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
