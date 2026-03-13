// Import all packages we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import our database connection
const connectDB = require('./config/database');

// Import our routes
const beneficiaryRoutes = require('./routes/beneficiaries');

// Create express app
const app = express();

// Connect to MongoDB
connectDB();

// MIDDLEWARE (functions that run before routes)
app.use(cors());                    // Allows frontend to connect
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true })); 

// ROUTES
app.use('/api/beneficiaries', beneficiaryRoutes);

// Test route to check if server is working
app.get('/', (req, res) => {
    res.send('FCA Refugee Support API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Test: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/beneficiaries`);
});