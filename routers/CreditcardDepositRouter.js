const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const {
  getResponse,
  getAll,
} = require('../controllers/CreditcardDepositController');

router.post('/response', getResponse);
router.get('/get', getAll);

module.exports = router;
