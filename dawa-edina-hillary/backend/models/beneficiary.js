const mongoose = require("mongoose");

const requiredMinTwo = (value) => typeof value === "string" && value.trim().length >= 2;

const isDateBefore = (dateA, dateB) => new Date(dateA) < new Date(dateB);
const isDateAfter = (dateA, dateB) => new Date(dateA) > new Date(dateB);

const allowedNationalities = [
    "Ugandan",
    "Kenyan",
    "Tanzanian",
    "Burundian",
    "Rwandese",
    "Somali",
    "South Sudanese"
];

const allowedMaritalStatus = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated"
];

const allowedSettlementCamps = [
    "Gulu settlement camp",
    "Arua settlement camp",
    "Mbarara settlement camp",
    "Kasese settlement camp",
    "Busia settlement camp",
    "Mbale settlement camp",
    "Kigezi settlement camp"
];

const beneficiarySchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true, minlength: 2 },
        lastName: { type: String, required: true, trim: true, minlength: 2 },
        placeOfBirth: { type: String, required: true, trim: true, minlength: 2 },
        dateOfBirth: { type: String, required: true },
        dateOfRegistration: { type: String, required: true },
        dateOfJoining: { type: String, required: true },
        gender: {
            type: String,
            enum: ["Female", "Male", "Other"],
            default: "Female"
        },
        nationality: { type: String, required: true, enum: allowedNationalities },
        maritalStatus: { type: String, required: true, enum: allowedMaritalStatus },
        settlementCamp: { type: String, required: true, enum: allowedSettlementCamps }
    },
    { timestamps: true }
);

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

const validateBeneficiary = (payload) => {
    const errors = [];

    if (!requiredMinTwo(payload.firstName)) errors.push("First name must be at least 2 characters.");
    if (!requiredMinTwo(payload.lastName)) errors.push("Last name must be at least 2 characters.");
    if (!requiredMinTwo(payload.placeOfBirth)) errors.push("Place of birth must be at least 2 characters.");

    if (!payload.dateOfBirth) errors.push("Date of birth is required.");
    if (!payload.dateOfRegistration) errors.push("Date of registration is required.");
    if (!payload.dateOfJoining) errors.push("Date of joining is required.");

    if (payload.dateOfBirth && payload.dateOfRegistration) {
        if (!isDateBefore(payload.dateOfBirth, payload.dateOfRegistration)) {
            errors.push("Date of birth must be before date of registration.");
        }
    }

    if (payload.dateOfJoining && payload.dateOfRegistration) {
        if (!isDateAfter(payload.dateOfJoining, payload.dateOfRegistration)) {
            errors.push("Date of joining must be after date of registration.");
        }
    }

    if (!allowedNationalities.includes(payload.nationality)) {
        errors.push("Invalid nationality.");
    }

    if (!allowedMaritalStatus.includes(payload.maritalStatus)) {
        errors.push("Invalid marital status.");
    }

    if (!allowedSettlementCamps.includes(payload.settlementCamp)) {
        errors.push("Invalid settlement camp.");
    }

    return errors;
};

module.exports = {
    Beneficiary,
    validateBeneficiary,
    allowedNationalities,
    allowedMaritalStatus,
    allowedSettlementCamps
};
