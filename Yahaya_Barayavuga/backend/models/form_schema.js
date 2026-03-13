const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
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
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    placeOfBirth: { 
        type: String, 
        required: true, 
        minlength: 3 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female'], 
        default: 'Female' 
    },
    nationality: { 
        type: String, 
        required: true,
        enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese']
    },
    maritalStatus: { 
        type: String, 
        required: true,
        enum: ['Single', 'Married']
    },
    settlementCamp: { 
        type: String, 
        required: true,
        enum: ['Gulu', 'Arua', 'Mbarara', 'Kasese', 'Busia', 'Mbale', 'Kigezi']
    },
    joiningDate: { 
        type: Date, 
        required: true 
    },
    registrationDate: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);