const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// POST /register
router.post('/register', async (req, res) => {
    try {
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

        // Create new beneficiary
        const newBeneficiary = new Beneficiary({
            firstName,
            lastName,
            placeOfBirth,
            dateOfBirth,
            gender,
            nationality,
            maritalStatus,
            settlementCamp,
            dateOfJoining,
            registrationDate: new Date() // Set registration date to now
        });

        // Save to database
        const savedBeneficiary = await newBeneficiary.save();
        
        res.status(201).json({
            message: 'Beneficiary registered successfully',
            data: savedBeneficiary
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                message: 'Validation Error',
                errors: messages
            });
        }
        console.error('Error saving beneficiary:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
