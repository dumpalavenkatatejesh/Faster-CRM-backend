const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models/employee');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Employee Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });

    const exists = await Employee.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, passwordHash: hash });
    res.json({ message: 'Registered successfully', employee });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Employee Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, employee.passwordHash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
