const express = require("express");

const router = express.Router();

const { registerBeneficiary } = require("../controller/beneficiaryController");

router.post("/register", registerBeneficiary);

module.exports = router;