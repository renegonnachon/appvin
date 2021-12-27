const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  save,
  getWitdrawById,
  getAll,
  update,
} = require('../controllers/withdrawController');
router.post('/save', save);
// router.delete('/delete/:id', deleteComment);
router.get('/get/:id', getWitdrawById);
router.get('/get-all', getAll);
router.put('/update', update);

module.exports = router;
