const express = require("express");
const connectDB = require("./config/db.js");
const Registration = require("./models/registration.js");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    // Create a new registration document
    const newRegistration = new Registration({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      birthPlace: req.body.birthPlace,
      gender: req.body.gender,
      nationality: req.body.nationality,
      maritalStatus: req.body.maritalStatus,
      camp: req.body.camp,
      joinDate: req.body.joinDate,
    });

    // Save to MongoDB
    await newRegistration.save();

    // Respond with success
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Failed to save registration", details: err.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
