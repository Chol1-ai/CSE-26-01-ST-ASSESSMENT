const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters'],
        trim: true
    },
    placeOfBirth: {
        type: String,
        required: [true, 'Place of birth is required'],
        minlength: [2, 'Place of birth must be at least 2 characters'],
        trim: true
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        required: true,
        enum: ['female', 'male', 'other'],
        default: 'female'
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
        enum: [
            'Ugandan', 'Kenyan', 'Tanzanian', 'Burundian',
            'Rwandese', 'Somali', 'South Sudanese'
        ]
    },
    maritalStatus: {
        type: String,
        required: [true, 'Marital status is required'],
        enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']
    },
    settlementCamp: {
        type: String,
        required: [true, 'Settlement camp is required'],
        enum: [
            'Gulu Settlement Camp',
            'Arua Settlement Camp',
            'Mbarara Settlement Camp',
            'Kasese Settlement Camp',
            'Busia Settlement Camp',
            'Mbale Settlement Camp',
            'Kigezi Settlement Camp'
        ]
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Date of joining is required']
    },
    registrationNumber: {
        type: String,
        unique: true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

// Generate registration number before saving
beneficiarySchema.pre('save', async function(next) {
    if (!this.registrationNumber) {
        const year = new Date().getFullYear();
        const count = await mongoose.model('Beneficiary').countDocuments();
        this.registrationNumber = `FCA${year}${String(count + 1).padStart(6, '0')}`;
    }
    next();
});

// Validate dates
beneficiarySchema.pre('save', function(next) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dob = new Date(this.dob);
    const joiningDate = new Date(this.dateOfJoining);

    if (dob >= today) {
        next(new Error('Date of birth must be before today'));
    }

    if (joiningDate <= today) {
        next(new Error('Joining date must be after today'));
    }

    next();
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);