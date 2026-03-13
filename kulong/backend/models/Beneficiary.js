const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"]
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"]
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"],
      trim: true,
      minlength: [2, "Place of birth must be at least 2 characters"]
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"]
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      enum: [
        "Ugandan",
        "Kenyan",
        "Tanzanian",
        "Burundian",
        "Rwandese",
        "Somali",
        "South Sudanese"
      ]
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["Single", "Married", "Divorced", "Widowed", "Separated"]
    },
    settlementCamp: {
      type: String,
      required: [true, "Settlement camp is required"],
      enum: [
        "Gulu Settlement Camp",
        "Arua Settlement Camp",
        "Mbarara Settlement Camp",
        "Kasese Settlement Camp",
        "Busia Settlement Camp",
        "Mbale Settlement Camp",
        "Kigezi Settlement Camp"
      ]
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);