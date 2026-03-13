const router = require('express').Router();
const Beneficiary = require('../models/User');


router.post('/register', async (req, res) => {
  try {
    const beneficiary = new Beneficiary({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      placeOfBirth: req.body.placeOfBirth,
      dateOfBirth: req.body.dateOfBirth,
      dateOfRegistration: req.body.dateOfRegistration,
      gender: req.body.gender,
      nationality: req.body.nationality,
      maritalStatus: req.body.maritalStatus,
      settlementCamp: req.body.settlementCamp,
      dateOfJoiningCamp: req.body.dateOfJoiningCamp,
    });

    await beneficiary.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }

    console.error('Error creating beneficiary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;






