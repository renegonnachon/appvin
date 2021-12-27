const Headers = require('../models/Inventory/Headers');

const createInventoryHeaders = async (req, res) => {
  try {
    const template = new Headers(req.body);
    const response = await template.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const addInventoryHeader = async (req, res) => {
  const cus = new Headers(req.body);
  try {
    const { header } = req.body;
    const response = await Headers.updateOne({ $push: { headers: header } });
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const removeInventoryHeader = async (req, res) => {
  const { header } = req.body;
  const response = await Headers.updateOne(
    {},
    {
      $pull: { headers: header },
    },
    { multi: true }
  );
};

const getHeaders = async (req, res) => {
  const headers = await Headers.findOne({}).select('headers');
  res.send(headers);
};

module.exports = {
  createInventoryHeaders,
  addInventoryHeader,
  removeInventoryHeader,
  getHeaders,
};
