const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    pob: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Female' },
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    settlement: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);