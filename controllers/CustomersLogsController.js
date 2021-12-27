const CustomersLogs = require('../models/CustomerLogs');

const save = async (req, res) => {
  const temp = req.body;

  try {
    const customerLogs = new CustomersLogs(temp);
    const response = await customerLogs.save();
    res.status(201).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

const get = async (req, res) => {
  const filters = req.body;
  const response = await CustomersLogs.find(filters)
    .populate('customer')
    .populate('owner')
    .sort({ _id: 'desc' })
    .limit(10);
  res.send(response);
};

// const getByCustomerId = async (req, res) => {
//   const customerId = req.params.customerId;
//   try {
//     const response = await CustomerSwitchLogs.find({ customer: customerId })
//       .populate('ownerFrom')
//       .populate('ownerTo')
//       .populate('customer');
//     res.status(200).send(response);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

module.exports = {
  save,
  get,
};
