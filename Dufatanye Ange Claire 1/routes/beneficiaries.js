const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// POST /api/beneficiaries
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // log for debugging

  // Convert date strings to Date objects
  ['dob', 'settlementDate', 'dateOfJoining'].forEach(field => {
    if (req.body[field]) req.body[field] = new Date(req.body[field]);
  });

  try {
    const beneficiary = new Beneficiary(req.body);
    await beneficiary.save();
    res.status(201).json({ message: 'Beneficiary registered successfully', beneficiary });
  } catch (error) {
    console.error('Error registering beneficiary:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = {};
      for (let field in error.errors) {
        messages[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }

    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;