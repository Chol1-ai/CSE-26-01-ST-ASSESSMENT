// ═══════════════════════════════════════════════
//  beneficiary.js
//  FCA Backend — Routes File
//  Location: Patrick_Hassan/backend/routes/beneficiary.js
//
//  What this file does:
//  - Handles POST /api/beneficiaries (save new beneficiary)
//  - Handles GET  /api/beneficiaries (get all beneficiaries)
//  - Validates data before saving to database
// ═══════════════════════════════════════════════

const express     = require("express");
const router      = express.Router();
const Beneficiary = require("../models/beneficiary");

// ════════════════════════════════════════════
//  POST /api/beneficiaries
//  Receives form data from the frontend
//  Validates it and saves to MongoDB
// ════════════════════════════════════════════
router.post("/", async (req, res) => {
  try {
    // ── Pull data from the request body ──
    const {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoining,
    } = req.body;

    // ── Get today's date for comparisons ──
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    const dob = new Date(dateOfBirth);
    const doj = new Date(dateOfJoining);

    // ── Backend validation ──
    // Even though the frontend validates, we always
    // validate on the backend too for security

    // 1. Check required text fields have minimum length
    if (!firstName || firstName.trim().length < 2) {
      return res.status(400).json({ message: "First name must be at least 2 characters" });
    }
    if (!lastName || lastName.trim().length < 2) {
      return res.status(400).json({ message: "Last name must be at least 2 characters" });
    }
    if (!placeOfBirth || placeOfBirth.trim().length < 2) {
      return res.status(400).json({ message: "Place of birth must be at least 2 characters" });
    }

    // 2. Date of birth must be BEFORE today
    if (dob >= today) {
      return res.status(400).json({ message: "Date of birth must be before today" });
    }

    // 3. Date of joining must be AFTER today
    if (doj <= today) {
      return res.status(400).json({ message: "Date of joining must be after today" });
    }

    // ── Create and save the new beneficiary record ──
    const newBeneficiary = new Beneficiary({
      firstName:      firstName.trim(),
      lastName:       lastName.trim(),
      dateOfBirth:    dob,
      placeOfBirth:   placeOfBirth.trim(),
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoining:  doj,
    });

    // Save to MongoDB
    const saved = await newBeneficiary.save();

    // Send success response back to frontend
    res.status(201).json({
      message: "Beneficiary registered successfully",
      data: saved,
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      message: "Server error. Could not register beneficiary.",
      error: error.message,
    });
  }
});

// ════════════════════════════════════════════
//  GET /api/beneficiaries
//  Returns all beneficiaries from the database
//  Useful for testing that records are saved
// ════════════════════════════════════════════
router.get("/", async (req, res) => {
  try {
    const all = await Beneficiary.find().sort({ createdAt: -1 });
    res.status(200).json({ count: all.length, data: all });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch beneficiaries" });
  }
});

module.exports = router;