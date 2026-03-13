const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// POST /api/beneficiaries — Register a new beneficiary
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoiningSettlementCamp,
    } = req.body;

    // Server-side validation
    const errors = {};

    if (!firstName || firstName.trim().length < 2) {
      errors.firstName = 'First name is required and must be at least 2 characters';
    }
    if (!lastName || lastName.trim().length < 2) {
      errors.lastName = 'Last name is required and must be at least 2 characters';
    }
    if (!placeOfBirth || placeOfBirth.trim().length < 2) {
      errors.placeOfBirth = 'Place of birth is required and must be at least 2 characters';
    }

    const now = new Date();

    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(dateOfBirth);
      if (isNaN(dob.getTime())) {
        errors.dateOfBirth = 'Invalid date of birth';
      } else if (dob >= now) {
        errors.dateOfBirth = 'Date of birth must be before the date of registration';
      }
    }

    if (!dateOfJoiningSettlementCamp) {
      errors.dateOfJoiningSettlementCamp = 'Date of joining settlement camp is required';
    } else {
      const joinDate = new Date(dateOfJoiningSettlementCamp);
      if (isNaN(joinDate.getTime())) {
        errors.dateOfJoiningSettlementCamp = 'Invalid date of joining settlement camp';
      } else if (joinDate <= now) {
        errors.dateOfJoiningSettlementCamp =
          'Date of joining settlement camp must be after the date of registration';
      }
    }

    const validNationalities = [
      'Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese',
    ];
    if (!nationality || !validNationalities.includes(nationality)) {
      errors.nationality = 'Please select a valid nationality';
    }

    const validMaritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
    if (!maritalStatus || !validMaritalStatuses.includes(maritalStatus)) {
      errors.maritalStatus = 'Please select a valid marital status';
    }

    const validCamps = [
      'Gulu settlement camp', 'Arua settlement camp', 'Mbarara settlement camp',
      'Kasese settlement camp', 'Busia settlement camp', 'Mbale settlement camp',
      'Kigezi settlement camp',
    ];
    if (!settlementCamp || !validCamps.includes(settlementCamp)) {
      errors.settlementCamp = 'Please select a valid settlement camp';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const beneficiary = new Beneficiary({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: new Date(dateOfBirth),
      placeOfBirth: placeOfBirth.trim(),
      gender: gender || 'Female',
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoiningSettlementCamp: new Date(dateOfJoiningSettlementCamp),
    });

    await beneficiary.save();

    res.status(201).json({
      success: true,
      message: 'Beneficiary registered successfully',
      data: beneficiary,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// // GET /api/beneficiaries — Get all beneficiaries
// router.get('/', async (req, res) => {
//   try {
//     const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
//     res.json({ success: true, count: beneficiaries.length, data: beneficiaries });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET /api/beneficiaries/:id — Get a single beneficiary
// router.get('/:id', async (req, res) => {
//   try {
//     const beneficiary = await Beneficiary.findById(req.params.id);
//     if (!beneficiary) {
//       return res.status(404).json({ success: false, message: 'Beneficiary not found' });
//     }
//     res.json({ success: true, data: beneficiary });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

module.exports = router;