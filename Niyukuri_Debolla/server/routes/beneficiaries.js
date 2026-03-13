const express = require("express");
const Beneficiary = require("../models/Beneficiary");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const beneficiary = await Beneficiary.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: req.body.placeOfBirth,
      gender: req.body.gender,
      nationality: req.body.nationality,
      maritalStatus: req.body.maritalStatus,
      settlementCamp: req.body.settlementCamp,
      dateOfJoining: req.body.dateOfJoining
    });

    res.status(201).json({ message: "Registered", beneficiary });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: "Failed to load beneficiaries" });
  }
});

module.exports = router;
