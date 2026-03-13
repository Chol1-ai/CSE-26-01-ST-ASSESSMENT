require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register')
const path = require("path");

const app = express();

// serve static assets
app.use(express.static(path.join(__dirname, "public")));

// serve the form at /register (GET)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "registration.html"));
});

// Parse incoming JSON and form data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Register route groups.
app.use('/', registerRoute)

// Connect to MongoDB and start the API server.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
