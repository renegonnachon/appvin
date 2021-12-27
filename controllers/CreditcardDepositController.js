const CreditCardHistory = require('../models/CreditcardDeposit');
const Test = require('../models/Test');

const getResponse = async (req, res) => {
  const cus = new CreditCardHistory(req.body);
  const test = new Test({ outPut: JSON.stringify(req.body) });
  try {
    const creditHistory = await cus.save();
    console.log('request body: ', req.body);
    res.status(201).send(creditHistory);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const getAll = async (req, res) => {
  const id = req.params.id;
  const data = await CreditCardHistory.find({})
    .populate('employeeId')
    .limit(10)
    .sort({ _id: 'desc' });

  res.send(data);
};

module.exports = {
  getResponse,
  getAll,
};
