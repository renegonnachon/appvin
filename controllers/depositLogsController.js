const DepositLogs = require('../models/DepositsLogs');

const saveDepositLogs = async (req, res) => {
  try {
    const template = new DepositLogs(req.body);
    const response = await template.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const getByCusomer = async (req, res) => {
  const customerId = req.params.id;

  const resposne = await DepositLogs.find({ customer: customerId }).populate(
    'user'
  );

  res.status(200).json(resposne);

  try {
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

const getAll = async (req, res) => {
  const resposne = await DepositLogs.find()
    .limit(10)
    .populate('user')
    .populate('customer')
    .sort({ _id: 'desc' });
  res.status(200).json(resposne);
  try {
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = {
  saveDepositLogs,
  getByCusomer,
  getAll,
};
