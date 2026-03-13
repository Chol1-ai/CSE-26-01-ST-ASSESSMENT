const mongoose = require("mongoose");
const Beneficiary = require("../models/Beneficiary");

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "placeOfBirth",
  "gender",
  "nationality",
  "maritalStatus",
  "settlementCamp",
  "dateOfJoining"
];

const sendError = (res, statusCode, message, extra = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...extra
  });
};

const sendSuccess = (res, statusCode, message, data = null, extra = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
    ...extra
  });
};

const getMissingFields = (body) => {
  return REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
};

const buildBeneficiaryData = (body) => ({
  firstName: body.firstName.trim(),
  lastName: body.lastName.trim(),
  dateOfBirth: body.dateOfBirth,
  placeOfBirth: body.placeOfBirth.trim(),
  gender: body.gender.trim(),
  nationality: body.nationality.trim(),
  maritalStatus: body.maritalStatus.trim(),
  settlementCamp: body.settlementCamp.trim(),
  dateOfJoining: body.dateOfJoining
});

const handleServerError = (res, error, fallbackMessage) => {
  console.error(fallbackMessage, error);

  if (error.name === "ValidationError") {
    return sendError(res, 400, "Validation failed", {
      errors: Object.values(error.errors).map((err) => err.message)
    });
  }

  if (error.name === "CastError") {
    return sendError(res, 400, "Invalid data format");
  }

  return sendError(res, 500, fallbackMessage, {
    error: error.message
  });
};

const createBeneficiary = async (req, res) => {
  try {
    const missingFields = getMissingFields(req.body);

    if (missingFields.length > 0) {
      return sendError(res, 400, "All fields are required", { missingFields });
    }

    const beneficiaryData = buildBeneficiaryData(req.body);
    const beneficiary = await Beneficiary.create(beneficiaryData);

    return sendSuccess(
      res,
      201,
      "Beneficiary registered successfully",
      beneficiary
    );
  } catch (error) {
    return handleServerError(res, error, "Failed to create beneficiary");
  }
};

const getBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Beneficiaries fetched successfully",
      count: beneficiaries.length,
      data: beneficiaries
    });
  } catch (error) {
    return handleServerError(res, error, "Failed to fetch beneficiaries");
  }
};

const getBeneficiaryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid beneficiary ID");
    }

    const beneficiary = await Beneficiary.findById(id);

    if (!beneficiary) {
      return sendError(res, 404, "Beneficiary not found");
    }

    return sendSuccess(
      res,
      200,
      "Beneficiary fetched successfully",
      beneficiary
    );
  } catch (error) {
    return handleServerError(res, error, "Failed to fetch beneficiary");
  }
};

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById
};