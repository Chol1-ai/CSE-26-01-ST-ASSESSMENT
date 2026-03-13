const express = require('express');
const router = express.Router();
const Beneficiary = require('./models/Beneficiary');

router.post('/register-beneficiary', async (req, res) => {
    try {
        // 1. Run Custom Date Validations
        const validation = validateBeneficiary(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: "Validation Failed", errors: validation.errors });
        }

        // 2. Create and Save New Beneficiary
        const newBeneficiary = new Beneficiary(req.body);
        await newBeneficiary.save();

        // 3. Send Success Response
        res.status(201).json({ 
            message: "Beneficiary registered successfully!",
            data: newBeneficiary 
        });

    } catch (error) {
        // Handle Mongoose Schema validation errors (minlength, required, enum)
        res.status(400).json({ 
            message: "Error saving beneficiary", 
            error: error.message 
        });
    }
});

module.exports = router;