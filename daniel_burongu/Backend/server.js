import dns from "node:dns";

// Force reliable DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("FCA Refugee Support API Running");
});

// Routes
app.use("/api/beneficiaries", beneficiaryRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});