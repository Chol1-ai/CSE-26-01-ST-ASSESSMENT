const { PORT, MONGODB_URI } = require('./config/env.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const beneficiaryRoutes = require('./routes/beneficiariesRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: FCA Backend is running
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FCA Backend is running' });
});

// API Routes
app.use('/api/beneficiaries', beneficiaryRoutes);

// Swagger UI — accessible at http://localhost:5000/api-docs
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'FCA API Docs',
    customCss: `
      .swagger-ui .topbar { background-color: #8DC63F; }
      .swagger-ui .topbar .download-url-wrapper { display: none; }
    `,
  })
);

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 FCA Backend running on   http://localhost:${PORT}`);
      console.log(`📖 Swagger API Docs at       http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });


