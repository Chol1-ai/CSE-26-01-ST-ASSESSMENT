
const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    dob: { type: Date, required: true },
    pob: { type: String, required: true, minlength: 2 },
    gender: { 
        type: String, 
        required: true, 
        enum: ['Male', 'Female'], 
        default: 'Female' 
    },
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    camp: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    registrationDate: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);