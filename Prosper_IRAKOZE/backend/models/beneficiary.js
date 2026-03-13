const mongoose = require('mongoose');

// This defines HOW our data looks in database
const beneficiarySchema = new mongoose.Schema({
    // First name field
    firstName: {
        type: String,        // Data type: Text
        required: true,       // Must be provided
        trim: true,           // Removes extra spaces
        minlength: 2          // Minimum 2 characters
    },
    
    // Last name field
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    
    // Place of birth field
    placeOfBirth: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    
    // Date of birth field
    dateOfBirth: {
        type: Date,
        required: true
    },
    
    // Gender field (radio button)
    gender: {
        type: String,
        enum: ['Male', 'Female'],  // Only these two values allowed
        default: 'Female'          // Default value (as per rules)
    },
    
    // Nationality field (dropdown)
    nationality: {
        type: String,
        enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 
               'Rwandese', 'Congolese', 'South Sudanese'],
        required: true
    },
    
    // Marital status field (dropdown)
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married'],
        required: true
    },
    
    // Settlement camp field (dropdown)
    settlementCamp: {
        type: String,
        enum: ['Gulu settlement camp', 'Arua settlement camp', 
               'Mbarara settlement camp', 'Kasese settlement camp',
               'Busia settlement camp', 'Mbale settlement camp', 
               'Kigezi settlement camp', 'Kyangwali settlement camp',
               'Kyaka I settlement camp', 'Kyaka II settlement camp',
               'Rwamwanja settlement camp'],
        required: true
    },
    
    // Date of joining camp
    dateOfJoining: {
        type: Date,
        required: true
    },
    
    // Registration date (automatically set when form is submitted)
    registrationDate: {
        type: Date,
        default: Date.now      // Automatically set to current date/time
    }
});

// Create the actual model from my schema
const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

// Export so other files can use it
module.exports = Beneficiary;