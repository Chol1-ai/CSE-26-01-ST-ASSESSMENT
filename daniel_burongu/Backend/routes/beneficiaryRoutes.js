import express from "express";
import Beneficiary from "../models/Beneficiary.js";

const router = express.Router();


// Create Beneficiary
router.post("/", async (req, res) => {

  try {

    const beneficiary = new Beneficiary(req.body);

    const saved = await beneficiary.save();

    res.status(201).json({
      success: true,
      data: saved
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// Get All Beneficiaries
router.get("/", async (req, res) => {

  try {

    const beneficiaries = await Beneficiary.find();

    res.json({
      success: true,
      count: beneficiaries.length,
      data: beneficiaries
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

export default router;