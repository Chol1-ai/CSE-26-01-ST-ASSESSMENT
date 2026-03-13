const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(frontendPath, "form.html"));
});

app.use("/api/beneficiaries", beneficiaryRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
