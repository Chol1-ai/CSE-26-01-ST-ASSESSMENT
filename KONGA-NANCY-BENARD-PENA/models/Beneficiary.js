const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be at least 2 characters'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    placeOfBirth: {
      type: String,
      required: [true, 'Place of birth is required'],
      minlength: [2, 'Place of birth must be at least 2 characters'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      default: 'Female',
      required: true,
    },
    nationality: {
      type: String,
      enum: [
        'Ugandan',
        'Kenyan',
        'Tanzanian',
        'Burundian',
        'Rwandese',
        'Somali',
        'South Sudanese',
      ],
      required: [true, 'Nationality is required'],
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
      required: [true, 'Marital status is required'],
    },
    settlementCamp: {
      type: String,
      enum: [
        'Gulu settlement camp',
        'Arua settlement camp',
        'Mbarara settlement camp',
        'Kasese settlement camp',
        'Busia settlement camp',
        'Mbale settlement camp',
        'Kigezi settlement camp',
      ],
      required: [true, 'Settlement camp is required'],
    },
    dateOfJoiningSettlementCamp: {
      type: Date,
      required: [true, 'Date of joining settlement camp is required'],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Beneficiary', beneficiarySchema);

















