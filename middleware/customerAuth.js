const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer.js');

const customerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismylife');
    const user = await Customer.findOne({
      id: decoded.id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ 'error': 'Please authenticaste.' });
  }
};

module.exports = customerAuth;
