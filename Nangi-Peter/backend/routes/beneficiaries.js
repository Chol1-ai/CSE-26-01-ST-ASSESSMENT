const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const { body, validationResult } = require('express-validator');

// Validation rules
const validateBeneficiary = [
    body('firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    body('lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    body('placeOfBirth').isLength({ min: 2 }).withMessage('Place of birth must be at least 2 characters'),
    body('dob').isISO8601().withMessage('Valid date of birth required'),
    body('gender').isIn(['female', 'male', 'other']),
    body('nationality').isIn([
        'Ugandan', 'Kenyan', 'Tanzanian', 'Burundian',
        'Rwandese', 'Somali', 'South Sudanese'
    ]),
    body('maritalStatus').isIn(['Single', 'Married', 'Divorced', 'Widowed', 'Separated']),
    body('settlementCamp').isIn([
        'Gulu Settlement Camp', 'Arua Settlement Camp', 'Mbarara Settlement Camp',
        'Kasese Settlement Camp', 'Busia Settlement Camp', 'Mbale Settlement Camp',
        'Kigezi Settlement Camp'
    ]),
    body('dateOfJoining').isISO8601().withMessage('Valid joining date required')
];

// POST /register - Register new beneficiary
router.post('/register', validateBeneficiary, async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Additional date validation
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dob = new Date(req.body.dob);
        const joiningDate = new Date(req.body.dateOfJoining);

        if (dob >= today) {
            return res.status(400).json({
                success: false,
                message: 'Date of birth must be before today'
            });
        }

        if (joiningDate <= today) {
            return res.status(400).json({
                success: false,
                message: 'Joining date must be after today'
            });
        }

        // Create beneficiary
        const beneficiary = new Beneficiary(req.body);
        await beneficiary.save();

        res.status(201).json({
            success: true,
            message: 'Beneficiary registered successfully',
            data: {
                registrationNumber: beneficiary.registrationNumber,
                name: `${beneficiary.firstName} ${beneficiary.lastName}`
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering beneficiary',
            error: error.message
        });
    }
});

// GET all beneficiaries
router.get('/', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find().sort({ registeredAt: -1 });
        res.json({
            success: true,
            count: beneficiaries.length,
            data: beneficiaries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching beneficiaries',
            error: error.message
        });
    }
});

module.exports = router;