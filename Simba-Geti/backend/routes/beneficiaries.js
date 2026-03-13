const express     = require('express');
const router      = express.Router();
const Beneficiary = require('../models/Beneficiary');


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
      dateOfJoiningCamp
    } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dob      = new Date(dateOfBirth);
    const campDate = new Date(dateOfJoiningCamp);

  
    const errors = {};

    if (!firstName || firstName.trim().length < 2)
      errors.firstName = 'First name must be at least 2 characters';

    if (!lastName || lastName.trim().length < 2)
      errors.lastName = 'Last name must be at least 2 characters';

    if (!placeOfBirth || placeOfBirth.trim().length < 2)
      errors.placeOfBirth = 'Place of birth must be at least 2 characters';

    if (!dateOfBirth || isNaN(dob.getTime()))
      errors.dateOfBirth = 'Valid date of birth is required';
    else if (dob >= today)
      errors.dateOfBirth = 'Date of birth must be before today';

    if (!gender || !['Male', 'Female'].includes(gender))
      errors.gender = 'Gender must be Male or Female';

    if (!nationality)
      errors.nationality = 'Nationality is required';

    if (!maritalStatus)
      errors.maritalStatus = 'Marital status is required';

    if (!settlementCamp)
      errors.settlementCamp = 'Settlement camp is required';

    if (!dateOfJoiningCamp || isNaN(campDate.getTime()))
      errors.dateOfJoiningCamp = 'Valid date of joining camp is required';
    else if (campDate <= today)
      errors.dateOfJoiningCamp = 'Date of joining settlement camp must be after today';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const beneficiary = new Beneficiary({
      firstName   : firstName.trim(),
      lastName    : lastName.trim(),
      dateOfBirth : dob,
      placeOfBirth: placeOfBirth.trim(),
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoiningCamp: campDate
    });

    await beneficiary.save();

    return res.status(201).json({
      success: true,
      message: 'Beneficiary registered successfully',
      data   : beneficiary
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error  : error.message
    });
  }
});



router.get('/', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count  : beneficiaries.length,
      data   : beneficiaries
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
