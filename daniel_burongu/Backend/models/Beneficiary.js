import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    minlength: 2
  },

  lastName: {
    type: String,
    required: true,
    minlength: 2
  },

  dob: {
    type: Date,
    required: true
  },

  placeOfBirth: {
    type: String,
    required: true,
    minlength: 2
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Female"
  },

  nationality: {
    type: String,
    required: true
  },

  maritalStatus: {
    type: String,
    required: true
  },

  settlementCamp: {
    type: String,
    required: true
  },

  joinDate: {
    type: Date,
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Beneficiary", beneficiarySchema);