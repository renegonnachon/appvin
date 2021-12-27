const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const {
  addInventoryHeader,
  getHeaders,
  removeInventoryHeader,
  createInventoryHeaders,
} = require('../controllers/headersController');
router.post('/create-headers', createInventoryHeaders);
router.post('/add-header/', addInventoryHeader);
router.post('/remove-header/', removeInventoryHeader);
router.get('/get-headers', getHeaders);

module.exports = router;
