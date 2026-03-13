require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/register', async (req, res) => {
    try {
        // This is where you would normally save to MongoDB using your Model
        console.log(req.body); // This will show your form data in the terminal
        res.send('Registration successful!');
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});
mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" Connection error:", err));

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
