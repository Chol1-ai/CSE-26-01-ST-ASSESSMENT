const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 3,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Female",
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    settlementCamp: {
      type: String,
      required: [true, "Settlement camp is required"],
      trim: true,
    },
    dateJoinedCamp: {
      type: Date,
      required: [true, "Date of joining settlement camp is required"],
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
