    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true, 
    },  
    DateOfBirth: {
        type: Date,
        required: true},
        
        PlaceOfBirth: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        
    },
    Nationality:{
        type: String,
        required: true
    },
    MaritalStatus:{
        type: String,
        required: true

    },
    SettlementCamp:{
        type: String,
        required: true
    },
    DateOfJoiningSettlementCamp: {
        type:Date,
        required: true

    }
    });
   module.exports = mongoose.model('User', userSchema);

 
