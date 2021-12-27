const express = require('express');
const router = new express.Router();
const {
  save,
  saveMany,
  getByCustomerId,
} = require('../controllers/customersSwitchController');
router.post('/save', save);
router.post('/save-many', saveMany);
router.get('/get-by-customer/:customerId', getByCustomerId);

module.exports = router;
