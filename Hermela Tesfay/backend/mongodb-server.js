const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;


const connectDB = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Connected to mongo DB");
    }catch(err){
        console.error(err);
    }
}

module.exports = connectDB;