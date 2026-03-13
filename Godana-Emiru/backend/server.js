const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const beneficiaryRoutes = require('./routes/beneficiaryRoutes');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/beneficiaries', beneficiaryRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});