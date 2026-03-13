const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To use a .env file for the DB URI

const app = express();


// --- Middleware ---
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static('.')); // Serve static files from current directory

// --- MongoDB Connection ---
// Replace the string below with your MongoDB Compass connection string if not using .env
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fca_refugee_db';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- Database Model ---
const beneficiarySchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    placeOfBirth: { type: String, required: true, minlength: 2 },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, default: 'female' },
    dateOfRegistration: { type: Date, default: Date.now },
    joiningDate: { type: Date, required: true }, // Field name matched to your HTML 'name' attribute
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    settlementCamp: { type: String, required: true }
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

// --- API Routes ---

/**
 * @route   POST /api/register
 * @desc    Register a new refugee beneficiary
 */
app.post('/api/register', async (req, res) => {
    try {
        const { dob: dateOfBirth, joiningDate } = req.body;
        const registrationDate = new Date(); // Today's date

        // 1. Logic Validation: Date of birth must be before registration
        if (new Date(dateOfBirth) >= registrationDate) {
            return res.status(400).json({ message: "Date of birth must be in the past." });
        }

        // 2. Logic Validation: Joining date must be after registration
        if (new Date(joiningDate) <= registrationDate) {
            return res.status(400).json({ message: "Date of joining camp must be after registration." });
        }

        // 3. Save to Database
        const newBeneficiary = new Beneficiary(req.body);
        await newBeneficiary.save();
        console.log('Beneficiary registered:', newBeneficiary.firstName, newBeneficiary.lastName);

        res.status(201).json({ message: "Beneficiary registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please check if all fields are valid." });
    }
});


app.get('/api/beneficiaries', async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.json(beneficiaries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

// --- Starting Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`FCA Server running on http://localhost:${PORT}`);
});