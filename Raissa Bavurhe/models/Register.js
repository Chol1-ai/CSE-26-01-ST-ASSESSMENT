const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({

firstName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
},

lastName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
},

placeOfBirth: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
},

dateOfBirth: {
    type: Date,
    required: true
},

dateOfRegistration: {
    type: Date,
    required: true,
    default: Date.now
},

gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Female"
},

nationality: {
    type: String,
    required: true,
    enum: [
        "Ugandan",
        "Kenyan",
        "Tanzanian",
        "Burundian",
        "Rwandese",
        "Somali",
        "South Sudanese"
    ]
},

maritalStatus: {
    type: String,
    required: true,
    enum: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated"
    ]
},

settlementCamp: {
    type: String,
    required: true,
    enum: [
        "Gulu settlement camp",
        "Arua settlement camp",
        "Mbarara settlement camp",
        "Kasese settlement camp",
        "Busia settlement camp",
        "Mbale settlement camp",
        "Kigezi settlement camp"
    ]
},

dateJoinedSettlementCamp: {
    type: Date,
    required: true
}

},
{
timestamps: true
});

module.exports = mongoose.model("Beneficiary", registerSchema);