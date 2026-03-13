const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/fca_refugee_db',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

const required = ['MONGODB_URI'];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn('Warning: ' + key + ' is not set in config/.env');
  }
});

module.exports = config;
