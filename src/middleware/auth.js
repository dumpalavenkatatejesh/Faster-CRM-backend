const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { Employee } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = header.split(' ')[1].trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Employee.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: 'Invalid token user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: ' + (err.message || 'Invalid token') });
  }
};

module.exports = authenticate;
