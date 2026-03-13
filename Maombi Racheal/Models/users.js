const mongoose = require('mongoose');
const {Schema} = mongoose;
const beneficiarySchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    placeOfBirth: { type: String, required: true, minlength: 2 },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, default: 'Female', enum: ['Male', 'Female', 'Other'] },
    dateOfRegistration: { type: Date, default: Date.now },
    dateOfJoiningCamp: { type: Date, required: true },
    nationality: { 
        type: String, 
        enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese'],
        required: true 
    },
    maritalStatus: { 
        type: String, 
        enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
        required: true 
    },
    settlementCamp: { 
        type: String, 
        enum: ['Gulu settlement camp', 'Arua settlement camp', 'Mbarara settlement camp', 'Kasese settlement camp', 'Busia settlement camp', 'Mbale settlement camp', 'Kigezi settlement camp'],
        required: true 
    }
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);