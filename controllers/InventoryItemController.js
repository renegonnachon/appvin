const Inventory = require('../models/Inventory/InventoryItem');

const addInventoryItem = async (req, res) => {
  const cus = new Inventory(req.body);
  try {
    const { header } = req.body;
    const response = await Inventory.updateOne({ $push: { headers: header } });
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(402).send({ error: err });
  }
};

const removeInventoryItem = async (req, res) => {
  const _id = req.params.id;
  const response = await Inventory.deleteOne({ _id });
  res.send(response);
  try {
  } catch (err) {}
};
const saveInventoryItem = async (req, res) => {
  const cus = new Inventory(req.body);
  try {
    const inventroy = await cus.save();
    res.status(201).send(inventroy);
  } catch (err) {
    res.status(402).send({ error: 'Email exists', custom: 'Hello there' });
  }
};

module.exports = {
  addInventoryItem,
  saveInventoryItem,
  removeInventoryItem,
};
