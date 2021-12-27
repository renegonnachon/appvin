const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

const initLogin = async (req, res) => {
  try {
    const customer = await Customer.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await customer.generateAuthToken();
    res
      .status(202)
      .cookie('token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 1000 * 1000),
      })
      .send({ customer, token });
  } catch (error) {
    console.log(' error', error);
    console.log('error', error);
    res.status(400).send({ message: 'could validata credentials', error });
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    const decoded = jwt.verify(token, 'thisismylife');
    const customer = await Customer.findOne({
      id: decoded.id,
      'tokens.token': token,
    });
    res.send(customer);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deposit = async (req, res) => {
  const { _id, amount } = req.body;
  try {
    const response = await Customer.findOneAndUpdate(
      { _id },
      { $inc: { balance: amount } }
    );
    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

const registerCustomer = async (req, res) => {
  const cus = new Customer(req.body);
  try {
    const customer = await cus.save();
    res.status(201).send(customer);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: 'Email exists', custom: 'Hello there' });
  }
};

const getByOwner = async (req, res) => {
  const customers = await Customer.getByOwner(req.body);
  const count = await Customer.getTotalCount(req.body);

  res.json({ customers, count });
};

const updateById = async (req, res) => {
  const { _id, updates } = req.body;

  delete updates.userRePassword;
  if (updates.userPassword && updates.userPassword.trim() === '') {
    delete updates.userPassword;
  }
  const response = await Customer.updateOne({ _id }, updates);
  res.json(response);
};

const updateManyById = async ({ body }, res) => {
  const { updates, ids } = body;
  if (updates.owner === '0') {
    updates.owner = undefined;
  }
  try {
    const response = await Customer.updateMany(
      { _id: { $in: ids } },
      { $set: updates }
    );
    res.send(response);
  } catch (e) {
    res.send('error:' + e);
  }
};

const getCustomerDetails = async (req, res) => {
  const id = req.params.id;
  const data = await Customer.findById(id)
    .populate('owner')
    .populate('comments');
  res.send(data);
};

const logOut = async (req, res) => {
  const { customer } = req.body;
  try {
    console.log('customer', customer._id);
    await Customer.updateOne({ _id: customer._id }, { tokens: [] });
    res.status(202).send({ 'message': 'logged out' });
  } catch (error) {
    res.send('error' + error);
  }
};

module.exports = {
  registerCustomer,
  logOut,
  getByOwner,
  updateById,
  getCustomerDetails,
  updateManyById,
  initLogin,
  validateToken,
  deposit,
};
