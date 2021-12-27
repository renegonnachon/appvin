const express = require('express');
const auth = require('../middleware/customerAuth');
const adminAuth = require('../middleware/auth');
const router = new express.Router();
router.post('/', auth, async (req, res) => {
  res.send(req.user);
});

router.post('/admin', adminAuth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
