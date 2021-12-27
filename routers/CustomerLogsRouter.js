const express = require('express');
const router = new express.Router();
const { save, get } = require('../controllers/CustomersLogsController');
router.post('/save', save);
// using post for sendign object (couldn't find better way :angry:)
router.post('/get', get);
// router.get('/get-by-customer/:customerId', getByCustomerId);

module.exports = router;
