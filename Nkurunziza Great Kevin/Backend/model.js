const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 2,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        required: true
    },
    placeOfBirth: {
        type: String,
        minLength: 2,
        required: true
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    nationality: {
        type: String,
        enum: ["Uganan", "Kenyan", "Burundian", "Tanzanian", "Rwandese", "Somali", "South Sudanese"]
    },
    maritalStaus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed", "Separated"]
    },
    settlementCamp: {
        type: String,
        enum: ["Gulu settlement camp", "Arua settlement camp", "Mbarara settlement camp", "Kasese settlement camp", "Busia settlement camp", "Mbale settlement camp", "Kigezi settlement camp"]
    },
    dateOfJoing: {
        type: String,
    },
})

const registerModel = mongoose.model("regester", registerSchema)

module.exports = {registerModel}