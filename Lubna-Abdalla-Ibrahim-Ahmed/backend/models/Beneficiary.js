const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    minlength: 3
  },

  lastName: {
    type: String,
    required: true,
    minlength: 3
  },

  placeOfBirth: {
    type: String,
    required: true,
    minlength: 3
  },

  dateOfBirth: Date,

  dateOfRegistration: Date,

  dateOfJoiningCamp: Date,

  gender: {
    type: String,
    default: "Male"
  },

  nationality: String,

  maritalStatus: String,

  settlementCamp: String

});

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);

