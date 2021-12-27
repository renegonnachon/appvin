const CustomerSwitchLogs = require('../models/CustomersSwitchLogs');

const save = async (req, res) => {
  const temp = req.body;

  try {
    const customerSwitchLog = new CustomerSwitchLogs(temp);
    const response = await customerSwitchLog.save();
    res.status(201).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

const saveMany = async (req, res) => {
  const logs = req.body;
  const response = await CustomerSwitchLogs.insertMany(logs);
  res.send(response);
};

const getByCustomerId = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const response = await CustomerSwitchLogs.find({ customer: customerId })
      .populate('ownerFrom')
      .populate('ownerTo')
      .populate('customer');
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  save,
  saveMany,
  getByCustomerId,
};
