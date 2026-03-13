const mongoose = require("mongoose")

const URI = process.env.MONGO_URI
const connectToDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Mongo Connected")
    } catch (err) {
        console.log("Failed to connect:", err)
    }
}

module.exports = {connectToDB}