
const express = require("express");
const router = express.Router();
const Register = require("../models/Register");

function isNonEmptyMin2(value) {
  return typeof value === "string" && value.trim().length >= 2;
}

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      placeOfBirth,
      dateOfBirth,
      dateOfRegistration,
      dateJoinedSettlementCamp,
      gender,
      nationality,
      maritalStatus,
      settlementCamp
    } = req.body;

    // Required + min length validation
    if (!isNonEmptyMin2(firstName)) {
      return res.status(400).json({ error: "First name must be at least 2 characters." });
    }
    if (!isNonEmptyMin2(lastName)) {
      return res.status(400).json({ error: "Last name must be at least 2 characters." });
    }
    if (!isNonEmptyMin2(placeOfBirth)) {
      return res.status(400).json({ error: "Place of birth must be at least 2 characters." });
    }

    // Date validation
    const dob = new Date(dateOfBirth);
    const regDate = new Date(dateOfRegistration);
    const join = new Date(dateJoinedSettlementCamp);

    if (isNaN(dob) || isNaN(regDate) || isNaN(join)) {
      return res.status(400).json({ error: "Invalid date values provided." });
    }

    if (dob >= regDate) {
      return res.status(400).json({ error: "Date of birth must be before date of registration." });
    }

    if (join <= regDate) {
      return res.status(400).json({ error: "Date of joining settlement camp must be after date of registration." });
    }

    // Enum validation
    const allowedNationalities = [
      "Ugandan",
      "Kenyan",
      "Tanzanian",
      "Burundian",
      "Rwandese",
      "Somali",
      "South Sudanese"
    ];

    const allowedMarital = ["Single", "Married", "Divorced", "Widowed", "Separated"];

    const allowedCamps = [
      "Gulu settlement camp",
      "Arua settlement camp",
      "Mbarara settlement camp",
      "Kasese settlement camp",
      "Busia settlement camp",
      "Mbale settlement camp",
      "Kigezi settlement camp"
    ];

    if (!allowedNationalities.includes(nationality)) {
      return res.status(400).json({ error: "Invalid nationality selected." });
    }
    if (!allowedMarital.includes(maritalStatus)) {
      return res.status(400).json({ error: "Invalid marital status selected." });
    }
    if (!allowedCamps.includes(settlementCamp)) {
      return res.status(400).json({ error: "Invalid settlement camp selected." });
    }

    if (!["Male", "Female"].includes(gender)) {
      return res.status(400).json({ error: "Invalid gender value." });
    }

    const record = await Register.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      placeOfBirth: placeOfBirth.trim(),
      dateOfBirth: dob,
      dateOfRegistration: regDate,
      dateJoinedSettlementCamp: join,
      gender,
      nationality,
      maritalStatus,
      settlementCamp
    });

    return res.status(201).json({ message: "Registration successful", data: record });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
