const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/fca";

if (!dbURI) {
  console.log("MONGO_URI not defined in environment variables");
  process.exit(1); // ensures the app stops if DB connection fails.
}
async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error", err.message);
    process.exit(1); // ensures the app stops if DB connection fails.
  }
}

module.exports = connectDB;
