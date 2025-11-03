const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createPublicEnquiry,
  getUnclaimedEnquiries,
  claimEnquiry,
  getMyEnquiries
} = require('../controllers/enquiryController');

// Public: submit enquiry (no auth)
router.post('/public', createPublicEnquiry);

// Public: list unclaimed enquiries (no auth required to view; if you want only employees to view, you can enable auth)
router.get('/public', getUnclaimedEnquiries);

// Claim an enquiry (auth required)
router.post('/:id/claim', auth, claimEnquiry);

// Get enquiries claimed by logged-in employee (auth required)
router.get('/mine', auth, getMyEnquiries);

module.exports = router;
