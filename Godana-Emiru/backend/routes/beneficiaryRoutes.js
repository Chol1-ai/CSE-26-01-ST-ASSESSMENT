const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// POST: Register a new beneficiary
router.post('/register', async (req, res) => {
  try {
    const newBeneficiary = new Beneficiary(req.body);
    const savedBeneficiary = await newBeneficiary.save();
    
    res.status(201).json({
      success: true,
      message: "Beneficiary registered successfully",
      data: savedBeneficiary
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
});



router.get('/', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
    res.status(200).json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;