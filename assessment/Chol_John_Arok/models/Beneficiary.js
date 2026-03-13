const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value < today;
        },
        message: "Date of birth must be in the past",
      },
    },
    pob: {
      type: String,
      required: [true, "Place of birth is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female",
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["Single", "Married", "Divorced", "Widowed", "Separated"],
    },
    settlementCamp: {
      type: String,
      required: [true, "Settlement camp is required"],
      trim: true,
    },
    doj: {
      type: Date,
      required: [true, "Date of joining is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
