const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  placeOfBirth: {
    type: String,
    required: [true, 'Place of birth is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not a valid gender'
    }
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    enum: {
      values: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese'],
      message: '{VALUE} is not a valid nationality'
    }
  },
  maritalStatus: {
    type: String,
    required: [true, 'Marital status is required'],
    enum: {
      values: ['Single', 'Married', 'Divorced', 'Widowed','Separated'],
      message: '{VALUE} is not a valid marital status'
    }
  },
  settlementCamp: {
    type: String,
    required: [true, 'Settlement camp is required'],
    enum: {
      values: ['Gulu', 'Arua', 'Mbarara', 'Kasese', 'Busia', 'Mbale', 'Kigezi'],
      message: '{VALUE} is not a valid settlement camp'
    }
  },
  dateOfJoining: {
    type: Date,
    required: [true, 'Date of joining settlement camp is required'],
  }
}, { 
  // Automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);