const { Enquiry } = require('../models');

// Public: create enquiry (no auth)
const createPublicEnquiry = async (req, res) => {
  try {
    const { name, email, phone, courseInterest } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });

    const en = await Enquiry.create({ name, email, phone, courseInterest, claimedBy: null });
    return res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: en });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get unclaimed public enquiries
const getUnclaimedEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.findAll({
      where: { claimedBy: null },
      order: [['createdAt', 'DESC']]
    });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Claim an enquiry (auth required)
const claimEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const en = await Enquiry.findByPk(id);
    if (!en) return res.status(404).json({ error: 'Enquiry not found' });
    if (en.claimedBy) return res.status(400).json({ error: 'Already claimed' });

    en.claimedBy = req.user.id;
    await en.save();
    res.json({ message: 'Claimed successfully', enquiry: en });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get enquiries claimed by logged-in user
const getMyEnquiries = async (req, res) => {
  try {
    const list = await Enquiry.findAll({
      where: { claimedBy: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createPublicEnquiry,
  getUnclaimedEnquiries,
  claimEnquiry,
  getMyEnquiries
};
