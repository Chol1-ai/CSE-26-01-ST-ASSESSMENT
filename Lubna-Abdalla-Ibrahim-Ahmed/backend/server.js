const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const beneficiaryRoutes = require("./routes/beneficiaryRoutes");

app.use("/api", beneficiaryRoutes);

mongoose.connect("mongodb://localhost:27017/fcaRefugeeDB")
.then(() => console.log("Database Connected"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});