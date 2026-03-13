// FCA Refugee Support System - Backend Server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Database = require("./models/database");

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
const db = new Database();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api", require("./routes/registration"));

// Serve the main application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/form.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` FCA Refugee Support System server running on port ${PORT}`);
  console.log(` Access the application at: http://localhost:${PORT}`);
  console.log(` Registration form at: http://localhost:${PORT}/form`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n Shutting down server gracefully...");
  db.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n Shutting down server gracefully...");
  db.close();
  process.exit(0);
});

module.exports = app;
