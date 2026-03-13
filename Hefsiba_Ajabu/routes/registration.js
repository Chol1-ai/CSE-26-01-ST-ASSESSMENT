const express = require('express');
const router = express.Router();
const Beneficiary = require('../Hefsiba_Ajabu/models/Beneficiary');

// POST route 
router.post('/register', async (req, res) => {
    try {
        const newBeneficiary = new Beneficiary(req.body);
        await newBeneficiary.save();
        res.status(201).send("Beneficiary Registered Successfully!");
    } catch (error) {
        res.status(400).send("Error saving to database: " + error.message);
    }
});

module.exports = router;