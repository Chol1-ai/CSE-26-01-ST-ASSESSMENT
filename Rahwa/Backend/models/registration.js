const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
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
  },
  birthPlace: {
    type: String,
    required: [true, "Birth place is required"],
    minlength: [2, "Birth place must be at least 2 characters"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female"],
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
  camp: {
    type: String,
    required: [true, "Settlement camp is required"],
    trim: true,
  },
  joinDate: {
    type: Date,
    required: [true, "Joining date is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("Registration", registrationSchema);
