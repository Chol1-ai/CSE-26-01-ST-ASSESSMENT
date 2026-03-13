require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');

const app = express();

/*Connect to MongoDB*/
connectDB();

/* Middleware */
app.use(cors({
  origin     : '*',
  methods    : ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Routes*/
app.use('/api/beneficiaries', require('./routes/beneficiaries'));

/* Health check */
app.get('/', (req, res) => {
  res.json({
    message: 'FCA Refugee Support Program API is running',
    status : 'OK',
    version: '1.0.0'
  });
});

/* 404 handler */
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/*Global error handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

/* Start server  */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`  FCA Server running on http://localhost:${PORT}`);
});
