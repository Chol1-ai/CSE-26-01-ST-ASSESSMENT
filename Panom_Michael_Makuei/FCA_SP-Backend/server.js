const path = require('path');
const connectDB = require(path.join(__dirname, 'Database', 'db_connect'));
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
const userInfoRoute = require(path.join(__dirname, 'routes', 'userInfoRoute'));
app.use('/api/userinfo', userInfoRoute);
app.listen(port, (err) => {
    if (err) {
        console.error('Error with server:', err);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});