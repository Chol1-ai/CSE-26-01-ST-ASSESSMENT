let mongoose = require("mongoose");

let registrationSChema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  place_of_birth: {
    type: String,
    required: true,
    minlength: 2,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  settlement_camp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("registration", registrationSChema);
