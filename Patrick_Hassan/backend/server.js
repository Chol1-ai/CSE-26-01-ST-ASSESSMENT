// ═══════════════════════════════════════════════
//  server.js
//  FCA Backend — Main Server File
//  Location: Patrick_Hassan/backend/server.js
//
//  What this file does:
//  - Starts the Express web server
//  - Connects to MongoDB database
//  - Registers our API routes
//  - Listens on port 5000
// ═══════════════════════════════════════════════

// ── Import required packages ──
const express    = require("express");   // web server framework
const mongoose   = require("mongoose");  // connects to MongoDB
const cors       = require("cors");      // allows frontend to talk to backend

// ── Import our routes file ──
const beneficiaryRoutes = require("./routes/beneficiary");

// ── Create the Express app ──
const app = express();

// ── Middleware ──
// These run on every request before it reaches our routes

// cors() allows our frontend (on a different port) to send requests here
app.use(cors());

// express.json() lets us read JSON data sent from the frontend form
app.use(express.json());

// ── Connect to MongoDB ──
// "fca_db" is the name of our database — MongoDB creates it automatically
mongoose
  .connect("mongodb://localhost:27017/fca_db")
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// ── Register Routes ──
// Any request to /api/beneficiaries will be handled by our routes file
app.use("/api/beneficiaries", beneficiaryRoutes);

// ── Root route — just to test the server is running ──
app.get("/", (req, res) => {
  res.json({ message: "FCA Refugee Support API is running ✅" });
});

// ── Start the server ──
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});