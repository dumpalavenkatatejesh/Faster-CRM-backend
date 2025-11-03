const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./config/database');
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', employeeRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Health
app.get('/', (req, res) => res.json({ ok: true, message: 'Fastor CRM API running' }));

const PORT = process.env.PORT || 4000;

// Start server after DB sync
(async () => {
  try {
    await sequelize.sync(); // create tables if not exists
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();
