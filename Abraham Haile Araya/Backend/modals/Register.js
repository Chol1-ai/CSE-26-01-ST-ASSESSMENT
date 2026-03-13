const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      match: [/^[a-zA-Z0-9\s]+$/, "First name must be alpha-numeric"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      match: [
        /^[a-zA-Z\s]+$/,
        "Last name must contain alphabetic characters only",
      ],
      minlength: [2, "Last name must be at least 2 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          return value < new Date();
        },
        message: "Date of birth must be before today (date of registration)",
      },
    },
    placeOfBirth: {
      type: String,
      required: [true, "Place of birth is required"],
      trim: true,
      minlength: [2, "Place of birth must be at least 2 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be either Male or Female",
      },
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
      enum: {
        values: [
          "Eritrean",
          "Ethiopian",
          "Ugandan",
          "Kenyan",
          "Tanzanian",
          "Burundian",
          "Rwandese",
          "Somali",
          "South Sudanese",
        ],
        message: "{VALUE} is not a valid nationality",
      },
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      trim: true,
      enum: {
        values: ["Single", "Married", "Divorced", "Widowed", "Separated"],
        message: "{VALUE} is not a valid marital status",
      },
    },
    settlementCamp: {
      type: String,
      required: [true, "Settlement camp is required"],
      trim: true,
      enum: {
        values: [
          "Gulu settlement camp",
          "Arua settlement camp",
          "Mbarara settlement camp",
          "Kasese settlement camp",
          "Busia settlement camp",
          "Mbale settlement camp",
          "Kigezi settlement camp",
        ],
        message: "{VALUE} is not a valid settlement camp",
      },
    },
    joiningDate: {
      type: Date,
      required: [true, "Date of joining settlement camp is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message:
          "Date of joining settlement camp must be before today",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Register", registerSchema);
