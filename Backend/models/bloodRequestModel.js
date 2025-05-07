const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
    urgency: { type: String, required: true },
    responses: [
      {
        donorId: { type: String },
        response: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);