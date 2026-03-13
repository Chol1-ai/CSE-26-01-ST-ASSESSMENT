const express = require("express");
const router = express.Router();
const Beneficiary = require("../models/beneficiaryModel");

const allowedNationalities = [
  "Congolese",
  "Ugandan",
  "Kenyan",
  "Tanzanian",
  "Burundian",
  "Rwandese",
  "Somali",
  "South Sudanese",
];

const allowedMaritalStatuses = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
];

const allowedSettlementCamps = [
  "Kyaka II settlement camp",
  "Nakivale settlement camp",
  "Rwamanja settlement camp",
  "Kiryando settlement camp",
  "Kyangwali settlement camp",
  "Bidibidi settlement camp",
  "Rhino settlement camp",
];

const toDateOnly = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

router.get("/", async (req, res) => {
  try {
    const data = await Beneficiary.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch beneficiaries" });
  }
});

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    gender,
    nationality,
    maritalStatus,
    settlementCamp,
    joinDate,
    registrationDate,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !placeOfBirth ||
    !gender ||
    !nationality ||
    !maritalStatus ||
    !settlementCamp ||
    !joinDate ||
    !registrationDate
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!allowedNationalities.includes(nationality)) {
    return res.status(400).json({ message: "Invalid nationality" });
  }

  if (!allowedMaritalStatuses.includes(maritalStatus)) {
    return res.status(400).json({ message: "Invalid marital status" });
  }

  if (!allowedSettlementCamps.includes(settlementCamp)) {
    return res.status(400).json({ message: "Invalid settlement camp" });
  }

  const regDate = toDateOnly(registrationDate);
  const dobDate = toDateOnly(dateOfBirth);
  const joinCampDate = toDateOnly(joinDate);

  if (!regDate || !dobDate || !joinCampDate) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (dobDate >= regDate) {
    return res
      .status(400)
      .json({ message: "Date of birth must be before registration date" });
  }

  if (joinCampDate <= regDate) {
    return res
      .status(400)
      .json({ message: "Join date must be after registration date" });
  }

  try {
    const record = await Beneficiary.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Unable to save beneficiary" });
  }
});

module.exports = router;
