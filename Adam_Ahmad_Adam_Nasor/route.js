const express = require("express");
const router = express.Router();
const Beneficiary = require("./model");

router.post("/", async (req, res) => {
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
      dateJoinedCamp,
    } = req.body;

    // Basic validation (you can use Joi or express-validator for more)
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !placeOfBirth ||
      !nationality ||
      !maritalStatus ||
      !settlementCamp ||
      !dateJoinedCamp
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newBeneficiary = new Beneficiary({
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender: gender || "Female",
      nationality,
      maritalStatus,
      settlementCamp,
      dateJoinedCamp,
    });

    const saved = await newBeneficiary.save();

    res.status(201).json({
      success: true,
      message: "Beneficiary registered successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);

    // Mongoose duplicate key error example
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate entry detected" });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ registeredAt: -1 });
    res.json(beneficiaries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
