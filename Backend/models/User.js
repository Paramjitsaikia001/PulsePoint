// models/User.js
const mongoose = require('mongoose');

const donorEligibilitySchema = new mongoose.Schema({
  ageBetween18to60: String,
  haemoglobinAbove12_5: String,
  pulseBetween50to100: String,
  bloodPressureNormal: String,
  temperatureNormal: String,
  rabiesOrHepatitisBInLastYear: String,
  tattooOrMajorSurgeryIn6Months: String,
  malariaOrBloodDonationIn3Months: String,
  immunizationsIn1Month: String,
  antibioticsIn48Hours: String,
  alcoholIn24Hours: String,
  dentalOrAspirinIn72Hours: String,
  coldOrCoughNow: String,
  pregnantOrBreastFeeding: String,
  menstruationCycle: String,
  diabetesOrHeartDisease: String,
  unexplainedFeverWeightLoss: String,
  tbOrAsthmaOrLiverDisease: String,
  hivOrBloodClottingDisorders: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname:{
    type:String,
    required:true
  },
  role: {
    type: String,
    enum: ['user', 'donor', 'admin'],
    default: 'user'
  },
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: [true, 'Password is required'] },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String },
  isDonor: { type: Boolean, default: false },
  donorEligibility: { type: donorEligibilitySchema, default: null },
  refreshToken: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
