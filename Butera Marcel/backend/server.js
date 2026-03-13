const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routers/router');

const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();    

app.use(express.json());
app.use('/api', router);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
