const express = require('express');
const { Enquiry } = require('../models/employee');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Public: Submit enquiry (no auth)
router.post('/public', async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
    const enquiry = await Enquiry.create({ name, email, phone, course, claimedBy: null });
    res.status(201).json(enquiry);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// Public: Fetch unclaimed leads
router.get('/public', async (req, res) => {
  try {
    const leads = await Enquiry.findAll({ where: { claimedBy: null } });
    res.json(leads);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// Auth: Claim a lead
router.post('/:id/claim', authenticate, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    if (enquiry.claimedBy) return res.status(400).json({ error: 'Already claimed' });

    enquiry.claimedBy = req.user.id;
    await enquiry.save();
    res.json({ message: 'Lead claimed', enquiry });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// Auth: Get leads claimed by logged-in user
router.get('/mine', authenticate, async (req, res) => {
  try {
    const myLeads = await Enquiry.findAll({ where: { claimedBy: req.user.id } });
    res.json(myLeads);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
