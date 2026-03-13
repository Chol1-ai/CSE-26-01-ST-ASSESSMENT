const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  dob: { type: Date, required: [true, 'Date of birth is required'] },
  placeOfBirth: { type: String, required: [true, 'Place of birth is required'] },
  gender: { type: String, required: [true, 'Gender is required'] },
  nationality: { type: String, required: [true, 'Nationality is required'] },
  maritalStatus: { type: String, required: [true, 'Marital status is required'] },
  settlementDate: { type: Date, required: [true, 'Settlement date is required'] },
  dateOfJoining: { type: Date, required: [true, 'Date of joining is required'] },
  settlementCamp: { type: String, required: [true, 'Settlement camp is required'] },
}, { timestamps: true });

module.exports = mongoose.model("Beneficiary", beneficiarySchema);