const express = require('express');
const auth = require('../middleware/auth');
const faker = require('faker');

const router = new express.Router();
const { createBuyer } = require('../controllers/systemController');
router.post('/createBuyer', createBuyer);

module.exports = router;
