// Import mongoose to talk to MongoDB
const mongoose = require('mongoose');

// This function connects to MongoDB
const connectDB = async () => {
    try {
        // Try to connect using the URI from .env file
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        // If successful, show this message
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, show error and exit
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Export the function so server.js can use it
module.exports = connectDB;