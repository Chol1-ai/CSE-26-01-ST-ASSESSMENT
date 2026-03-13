const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 2 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true, 
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
        enum: ['male', 'female'], 
        default: 'female' 
    },
    nationality: { 
        type: String, 
        required: true,
        enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese']
    },
    maritalStatus: { 
        type: String, 
        required: true,
        enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']
    },
    settlementCamp: { 
        type: String, 
        required: true,
        enum: [
            'Gulu settlement camp', 'Arua settlement camp', 'Mbarara settlement camp', 
            'Kasese settlement camp', 'Busia settlement camp', 'Mbale settlement camp', 
            'Kigezi settlement camp'
        ]
    },
    joiningDate: { 
        type: Date, 
        required: true 
    },
    dateOfRegistration: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Beneficiary', beneficiarySchema);