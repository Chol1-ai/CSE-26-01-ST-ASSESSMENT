const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    dateOfRegistration: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['female', 'male'],
      default: 'female',
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      enum: [
        'Ugandan',
        'Kenyan',
        'Tanzanian',
        'Burundian',
        'Rwandese',
        'Somali',
        'South Sudanese',
      ],
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
    },
    settlementCamp: {
      type: String,
      required: true,
      enum: [
        'Gulu settlement camp',
        'Arua settlement camp',
        'Mbarara settlement camp',
        'Kasese settlement camp',
        'Busia settlement camp',
        'Mbale settlement camp',
        'Kigezi settlement camp',
      ],
    },
    dateOfJoiningCamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Beneficiary', userSchema);
