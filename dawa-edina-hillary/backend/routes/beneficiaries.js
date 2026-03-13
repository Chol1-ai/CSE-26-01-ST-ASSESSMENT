const express = require("express");
const { Beneficiary, validateBeneficiary } = require("../models/beneficiary");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 }).lean();
        res.json(beneficiaries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch beneficiaries." });
    }
});

router.post("/", async (req, res) => {
    const errors = validateBeneficiary(req.body);
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    try {
        const newEntry = await Beneficiary.create(req.body);
        return res.status(201).json(newEntry);
    } catch (error) {
        return res.status(500).json({ error: "Failed to save beneficiary." });
    }
});

module.exports = router;
