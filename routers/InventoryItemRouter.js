const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();

const {
  saveInventoryItem,
  addInventoryItem,
  removeInventoryItem,
} = require('../controllers/InventoryItemController');

router.post('/save/', saveInventoryItem);
// router.post('/add-inventory-item/', addInventoryItem);
router.get('/remove-inventory-item/:id', removeInventoryItem);
// router.get('/get-headers', getHeaders);

module.exports = router;
