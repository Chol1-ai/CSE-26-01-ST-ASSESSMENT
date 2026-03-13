const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));
});

module.exports = router;
