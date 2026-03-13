// Bringing in the packages this server needs to do its work
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// The form schema that tells MongoDB how to store our data
const form = require('./models/form_schema');

// Starting the Express application
const app = express();

// Allowing the frontend to talk to this backend without any quarrel
app.use(cors());
// Teaching the server to understand JSON that comes from the frontend
app.use(express.json());

// Connecting to the MongoDB database using the URI from the .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// POST route that receives and saves a new beneficiary to the database
app.post('/api/beneficiaries', async (req, res) => {
    try {
        // Grabbing the form data that was sent from the frontend
        const beneficiaryData = req.body;

        // Creating a new beneficiary record using the Mongoose model
        const newBeneficiary = new form(beneficiaryData);
        
        // Saving the record into the database
        const savedBeneficiary = await newBeneficiary.save();

        // Logging the saved beneficiary to the console
        console.log(savedBeneficiary);

        // Telling the frontend that things went well
        res.status(201).json({ 
            message: 'Beneficiary registered successfully', 
            beneficiary: savedBeneficiary
        });

    } catch (error) {
        // Something went wrong, we console log it and send back the bad news
        console.error('Registration Error:', error);
        res.status(400).json({ 
            message: 'Failed to register beneficiary', 
            error: error.message 
        });
    }
});

// Starting the server on the port from .env or 5000 if none is provided
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});