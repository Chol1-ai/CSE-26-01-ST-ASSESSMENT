const express = require("express");
const router = express.Router();

const {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  
} = require("../controllers/beneficiaryController");

router.post("/", createBeneficiary);
router.get("/", getBeneficiaries);
router.get("/:id", getBeneficiaryById);


module.exports = router;