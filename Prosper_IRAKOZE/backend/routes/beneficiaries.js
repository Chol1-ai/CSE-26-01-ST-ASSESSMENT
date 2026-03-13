const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/beneficiary');

// @route   POST /api/beneficiaries
// @desc    Register a new beneficiary
// @access  Public
router.post('/', async (req, res) => {
    try {
        // Get all data from request body (what frontend sends)
        const {
            firstName,
            lastName,
            placeOfBirth,
            dateOfBirth,
            gender,
            nationality,
            maritalStatus,
            settlementCamp,
            dateOfJoining
        } = req.body;

        // VALIDATION RULES - check if all required fields are provided
        
        // Check dates:
        // 1. Date of birth must be before registration date (today)
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const joiningDate = new Date(dateOfJoining);
        
        if (birthDate > today) {
            return res.status(400).json({ 
                message: 'Date of birth must be before today' 
            });
        }
        
        // 2. Date of joining must be after registration date (today)
        if (joiningDate < today) {
            return res.status(400).json({ 
                message: 'Date of joining must be after today' 
            });
        }

        // Create new beneficiary in database
        const newBeneficiary = new Beneficiary({
            firstName,
            lastName,
            placeOfBirth,
            dateOfBirth,
            gender,
            nationality,
            maritalStatus,
            settlementCamp,
            dateOfJoining
        });

        // Save to database
        const savedBeneficiary = await newBeneficiary.save();

        // Send success response back to frontend
        res.status(201).json({
            success: true,
            message: 'Beneficiary registered successfully',
            data: savedBeneficiary
        });

    } catch (error) {
        // If error, send error message
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/beneficiaries
// @desc    Get all beneficiaries
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Find all beneficiaries in database
        const beneficiaries = await Beneficiary.find().sort({ registrationDate: -1 });
        
        // Send them to frontend
        res.json({
            success: true,
            count: beneficiaries.length,
            data: beneficiaries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;