const express = require("express");
const router = express.Router();
const Beneficiary = require("../models/Beneficiary");

router.post("/register", async (req, res) => {

  try {

    const beneficiary = new Beneficiary(req.body);
    await beneficiary.save();

    res.status(201).json({
      message: "Beneficiary registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: "Registration failed"
    });

  }

});

module.exports = router;