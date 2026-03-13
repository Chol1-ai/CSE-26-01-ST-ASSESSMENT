const { default: mongoose } = require("mongoose")
const {dbconnect} = require("../config/dbconfig")

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    dateofbirth:{
        type: String,
        require: true
    },
    placeofbirth:{
        type: String,
        require: true
    },
     gender:{
        type: String,
        require: true
    },
     nationality:{
        type: String,
        require: true
    },
     maritalstatus:{
        type: String,
        require: true
    },
     settlementcamp:{
        type: String,
        require: true
    },
     dateofjoining:{
        type: String,
        require: true
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = {userModel}