const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {
  registerCustomer,
  getByOwner,
  initLogin,
  logOut,

  logOutAll,
  validateToken,
  updateById,
  updateManyById,
  getCustomerDetails,
  deposit,
} = require('../controllers/customerControllers');

router.post('/login', initLogin);
router.post('/validateToken', validateToken);
router.post('/register', registerCustomer);
router.post('/get-by-owner', getByOwner);
router.patch('/update', updateById);
router.patch('/update-many', updateManyById);
router.get('/details/:id', auth, getCustomerDetails);
router.patch('/deposit', deposit);
router.post('/logout', logOut);
// create fake customers (temporary)

const faker = require('faker');
const Customer = require('../models/Customer');
const User = require('../models/User.js');
const campaign = [
  'nat',
  'toto',
  'portql',
  'toto c',
  'arface',
  'toto luxe',
  'toto wiski',
  'tot luxe 2',
  'frefre',
];

const status = [
  'new',
  'bad number',
  'vip',
  'not interested',
  'No answer 2',
  'No answer 3',
  'deposit',
  'callback',
  'interested',
];
router.post('/createfake', async (req, res) => {
  for (let i = 0; i < 1; i++) {
    const customerTemplate = {
      'firstName': faker.name.firstName(),
      'lastName': faker.name.lastName(),
      'email': faker.internet.email(),
      'phone': faker.phone.phoneNumberFormat(),
      'userName': faker.internet.userName(),
      'userPassword': faker.internet.password(),
      'country': faker.address.country(0),
      'isAgreed': 'true',
      'campaign': Math.floor(Math.random() * campaign.length),
      'status': Math.floor(Math.random() * status.length),

      'isActive': true,
    };

    const use = new Customer(customerTemplate);
    const customer = await use.save();
  }
  const fake = faker.name.firstName();
  res.send(' creating fakes' + fake);
});

module.exports = router;
