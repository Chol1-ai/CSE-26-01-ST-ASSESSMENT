// ═══════════════════════════════════════════════
//  Beneficiary.js
//  FCA Backend — Database Model
//  Location: Patrick_Hassan/backend/models/Beneficiary.js
//
//  What this file does:
//  - Defines the shape of a beneficiary record
//  - Each field has a type and validation rules
//  - Mongoose uses this to save data to MongoDB
// ═══════════════════════════════════════════════

const mongoose = require("mongoose");

// ── Define the schema (shape of our data) ──
// Think of this like designing the columns of a table
const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      trim: true, // removes extra spaces
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"],
      minlength: [2, "Place of birth must be at least 2 characters"],
      trim: true,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female"], // only these two values allowed
      default: "Female",
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
        "South Sudanese",
      ],
    },

    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      enum: ["Single", "Married", "Divorced", "Widowed", "Separated"],
    },

    settlementCamp: {
      type: String,
      required: [true, "Settlement camp is required"],
      enum: [
        "Gulu settlement camp",
        "Arua settlement camp",
        "Mbarara settlement camp",
        "Kasese settlement camp",
        "Busia settlement camp",
        "Mbale settlement camp",
        "Kigezi settlement camp",
      ],
    },

    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
    },

    // Automatically record when this entry was created
    dateOfRegistration: {
      type: Date,
      default: Date.now,
    },
  },

  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// ── Export the model ──
// "Beneficiary" becomes the collection name in MongoDB (beneficiaries)
module.exports = mongoose.model("Beneficiary", beneficiarySchema);