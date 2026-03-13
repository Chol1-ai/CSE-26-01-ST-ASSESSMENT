const express = require('express');
const mongoose = require('mongoose');
const Register = require('./modals/register');
const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS manually to allow frontend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/assessment");
    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const newBeneficiary = new Register(req.body);
    const savedBeneficiary = await newBeneficiary.save();
    res.status(201).json(savedBeneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});