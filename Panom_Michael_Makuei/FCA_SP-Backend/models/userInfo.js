const e = require('express');
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2
    },
    placeOfBirth: {
        type: String,
        required: true,
        minlength: 2
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
        default: 'Female'
    }, 
    nationality: {
        type: String,
        required: true,
        enum: ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandan', 'South Sudanese', 'Somali'],
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
    },
    settlement: {
        type: String,
        required: true,
        enum: ['Gulu settlement camp', 'Arua settlement camp', 'Mbarara settlement camp', 'Kasese settlement camp', 'Busia settlement camp', 'Mbale settlement camp', 'Kigezi settlement camp'],
    },
    dateOfjoining: {
        type: Date,
        required: true
    },

    dateofRegistration: {
        type: Date,
        default: Date.now
    },

}); 

module.exports = mongoose.model('UserInfo', userInfoSchema);