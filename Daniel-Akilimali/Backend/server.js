
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Beneficiary = require('./models/beneficiary');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


app.use(cors()); 
app.use(express.json()); 

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

// POST Route: Register a new beneficiary
app.post('/api/register', async (req, res) => {
    try {
        
        const beneficiaryData = req.body;

       
        const newBeneficiary = new Beneficiary(beneficiaryData);

        await newBeneficiary.save();

      
        res.status(201).json({ message: 'Beneficiary registered successfully!' });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(400).json({ message: 'Error registering beneficiary', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});