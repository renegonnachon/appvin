const express = require('express');
const router = new express.Router();
const {
  save,
  get,
  deleteInventoryRequest,
  updateOne,
  pushOffers,
  deleteOffer,
} = require('../controllers/CustomerInventoryController');
router.post('/save', save);
// using post for sendign object (couldn't find better way :angry:)
router.post('/get', get);
router.delete('/delete/:id', deleteInventoryRequest);
router.put('/update-one/:id', updateOne);
router.put('/update-one/:id', updateOne);
router.post('/push-offers/:id', pushOffers);
router.post('/delete-offer/:id', deleteOffer);

module.exports = router;
