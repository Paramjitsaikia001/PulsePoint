// // models/User.js
// const mongoose = require("mongoose");

// const donorEligibilitySchema = new mongoose.Schema(
//   {
//     ageBetween18to60: String,
//     haemoglobinAbove12_5: String,
//     pulseBetween50to100: String,
//     bloodPressureNormal: String,
//     temperatureNormal: String,
//     rabiesOrHepatitisBInLastYear: String,
//     tattooOrMajorSurgeryIn6Months: String,
//     malariaOrBloodDonationIn3Months: String,
//     immunizationsIn1Month: String,
//     antibioticsIn48Hours: String,
//     alcoholIn24Hours: String,
//     dentalOrAspirinIn72Hours: String,
//     coldOrCoughNow: String,
//     pregnantOrBreastFeeding: String,
//     menstruationCycle: String,
//     diabetesOrHeartDisease: String,
//     unexplainedFeverWeightLoss: String,
//     tbOrAsthmaOrLiverDisease: String,
//     hivOrBloodClottingDisorders: String,
//   },
//   { _id: false }
// );

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   phone: { type: String, unique: true, required: true },
//   gender: String,
//   dob: Date,
//   bloodGroup: String,
//   isDonor: Boolean,
//   donorEligibility: donorEligibilitySchema,
//   role: { type: String, default: "user" },
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const donorEligibilitySchema = new mongoose.Schema(
  {
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
    hivOrBloodClottingDisorders: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  gender: String,
  dob: Date,
  bloodGroup: String,
  isDonor: Boolean,
  donorEligibility: donorEligibilitySchema,
  shopName: { type: String },
  licenseNumber: { type: String },
  role: { type: String, default: "user" },
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", userSchema);