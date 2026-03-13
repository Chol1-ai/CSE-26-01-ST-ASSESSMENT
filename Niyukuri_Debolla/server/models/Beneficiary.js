const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    nationality: { type: String, required: true, trim: true },
    maritalStatus: { type: String, required: true, trim: true },
    settlementCamp: { type: String, required: true, trim: true },
    dateOfJoining: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
