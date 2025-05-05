// models/User.js
const mongoose = require('mongoose');

const donorEligibilitySchema = new mongoose.Schema({
    ageBetween18to60: Boolean,
    haemoglobinAbove12_5: Boolean,
    pulseBetween50to100: Boolean,
    bloodPressureNormal: Boolean,
    temperatureNormal: Boolean,
    rabiesOrHepatitisBInLastYear: Boolean,
    tattooOrMajorSurgeryIn6Months: Boolean,
    malariaOrBloodDonationIn3Months: Boolean,
    immunizationsIn1Month: Boolean,
    antibioticsIn48Hours: Boolean,
    alcoholIn24Hours: Boolean,
    dentalOrAspirinIn72Hours: Boolean,
    coldOrCoughNow: Boolean,
    pregnantOrBreastFeeding: Boolean,
    menstruationCycle: Boolean,
    diabetesOrHeartDisease: Boolean,
    unexplainedFeverWeightLoss: Boolean,
    tbOrAsthmaOrLiverDisease: Boolean,
    hivOrBloodClottingDisorders: Boolean
}, { _id: false });

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'donor', 'admin'],
        default: 'user'
    },
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender: String,
    dob: Date,
    bloodGroup: { type: String },
    isDonor: { type: Boolean, default: false },
    donorEligibility: { type: donorEligibilitySchema, default: null },
    refreshToken: { type: String } // Added refreshToken field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
