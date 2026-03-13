require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./mongodb");
const beneficiaryRoutes = require("./route");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "FCA Refugee Support Program API" });
});
app.use("/register", beneficiaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
