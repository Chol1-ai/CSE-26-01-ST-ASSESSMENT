// API Routes for FCA Refugee Support System
const express = require("express");
const router = express.Router();
const Database = require("../models/database");

// Initialize database instance
const db = new Database();

// POST /api/register - Register new beneficiary
router.post("/register", async (req, res) => {
  try {
    console.log(" New registration request received:", req.body);

    // Validate request data
    const validationErrors = db.validateBeneficiaryData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Insert beneficiary into database
    const result = await db.insertBeneficiary(req.body);

    res.status(201).json({
      success: true,
      message: "Beneficiary registered successfully",
      data: {
        id: result.id,
        registrationDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(" Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

// GET /api/beneficiaries - Get all beneficiaries
router.get("/beneficiaries", async (req, res) => {
  try {
    const beneficiaries = await db.getAllBeneficiaries();

    res.json({
      success: true,
      message: "Beneficiaries retrieved successfully",
      data: beneficiaries,
      count: beneficiaries.length,
    });
  } catch (error) {
    console.error(" Error fetching beneficiaries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve beneficiaries",
      error: error.message,
    });
  }
});

// GET /api/beneficiaries/:id - Get beneficiary by ID
router.get("/beneficiaries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await db.getBeneficiaryById(id);

    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: "Beneficiary not found",
      });
    }

    res.json({
      success: true,
      message: "Beneficiary retrieved successfully",
      data: beneficiary,
    });
  } catch (error) {
    console.error(" Error fetching beneficiary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve beneficiary",
      error: error.message,
    });
  }
});

// GET /api/beneficiaries/camp/:camp - Get beneficiaries by settlement camp
router.get("/beneficiaries/camp/:camp", async (req, res) => {
  try {
    const { camp } = req.params;
    const beneficiaries = await db.getBeneficiariesByCamp(
      decodeURIComponent(camp),
    );

    res.json({
      success: true,
      message: `Beneficiaries from ${camp} retrieved successfully`,
      data: beneficiaries,
      count: beneficiaries.length,
    });
  } catch (error) {
    console.error(" Error fetching beneficiaries by camp:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve beneficiaries by camp",
      error: error.message,
    });
  }
});

// GET /api/statistics - Get registration statistics
router.get("/statistics", async (req, res) => {
  try {
    const stats = await db.getStatistics();

    res.json({
      success: true,
      message: "Statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    console.error(" Error fetching statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve statistics",
      error: error.message,
    });
  }
});

// GET /api/health - Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "FCA Refugee Support System API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// POST /api/validate - Validate form data without saving
router.post("/validate", (req, res) => {
  try {
    const validationErrors = db.validateBeneficiaryData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    res.json({
      success: true,
      message: "Data is valid",
    });
  } catch (error) {
    console.error(" Validation error:", error);
    res.status(500).json({
      success: false,
      message: "Validation failed",
      error: error.message,
    });
  }
});

module.exports = router;
