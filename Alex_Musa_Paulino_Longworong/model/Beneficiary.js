const mongoose = require("mongoose");

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

    dateOfBirth: {
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

    settlement: {
        type: String,
        required: true
    },

    dateOfJoining: {
        type: Date,
        required: true
    },

    dateOfJoining: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);