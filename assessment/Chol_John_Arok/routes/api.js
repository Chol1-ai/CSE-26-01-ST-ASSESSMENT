const express = require("express");
const router = express.Router();
const Beneficiary = require("../models/Beneficiary");

// POST route to handle registration
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      pob,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      doj,
    } = req.body;

    // Server-side validation 
    if (
      !firstName ||
      !lastName ||
      firstName.length < 2 ||
      lastName.length < 2
    ) {
      return res.status(400).json({ message: "Invalid Name fields" });
    }

    // Validate required fields
    if (
      !dob ||
      !pob ||
      !nationality ||
      !maritalStatus ||
      !settlementCamp ||
      !doj
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Logic check: DOB must be before today
    const birthDate = new Date(dob);
    const today = new Date();
    if (birthDate >= today) {
      return res
        .status(400)
        .json({ message: "Date of birth must be in the past" });
    }

    // Validate DOB is reasonable (not too old)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 150);
    if (birthDate < minDate) {
      return res
        .status(400)
        .json({ message: "Please enter a valid date of birth" });
    }

    // Create new beneficiary instance
    const newBeneficiary = new Beneficiary({
      firstName,
      lastName,
      dob,
      pob,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      doj,
    });

    // Save to MongoDB
    await newBeneficiary.save();

    res.status(201).json({
      success: true,
      message: "Beneficiary registered successfully",
    });
  } catch (error) {
    console.error(error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error: Could not save registration",
    });
  }
});

module.exports = router;
