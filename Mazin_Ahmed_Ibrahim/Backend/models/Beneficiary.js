const mongoose = require("mongoose")

const BeneficiarySchema = new mongoose.Schema({

firstName:{
type:String,
required:true,
minlength:2
},

lastName:{
type:String,
required:true,
minlength:2
},

placeOfBirth:{
type:String,
required:true,
minlength:2
},

dateOfBirth:{
type:Date,
required:true
},

dateOfRegistration:{
type:Date,
required:true
},

gender:{
type:String,
default:"Female"
},

nationality:{
type:String,
required:true
},

maritalStatus:{
type:String,
required:true
},

settlementCamp:{
type:String,
required:true
},

joinSettlementDate:{
type:Date,
required:true
}

})

module.exports = mongoose.model("Beneficiary",BeneficiarySchema)