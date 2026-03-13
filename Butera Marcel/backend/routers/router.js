const express = require('express');
const router = express.Router();
const registerUser = require('../controller/controller');

// Create a new user    
router.post('/users', registerUser);

module.exports = router;