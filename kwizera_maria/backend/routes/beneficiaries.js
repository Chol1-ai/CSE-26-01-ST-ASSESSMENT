const express = require('express');
const { getDb } = require('../db');
const { validateBeneficiary } = require('../models/beneficiary');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const items = await db.collection('beneficiaries').find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch beneficiaries.' });
  }
});

router.post('/', async (req, res) => {
  const payload = req.body || {};
  const errors = validateBeneficiary(payload);

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    const db = getDb();
    const record = {
      ...payload,
      dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null,
      dateOfJoining: payload.dateOfJoining ? new Date(payload.dateOfJoining) : null,
      createdAt: new Date()
    };

    const result = await db.collection('beneficiaries').insertOne(record);
    return res.status(201).json({ _id: result.insertedId, ...record });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save beneficiary.' });
  }
});

module.exports = router;
