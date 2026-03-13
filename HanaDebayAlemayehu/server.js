const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');


connectDB();
const app = express();
app.use(express.json());
// Middleware to parse urlencoded data from forms
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


// app.use(express.static(path.join(__dirname, 'views')));
app.use('/api/users', userRoutes);




app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
