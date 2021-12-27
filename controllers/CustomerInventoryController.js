const CustomerInventory = require('../models/CustomerInventory');

const save = async (req, res) => {
  const temp = req.body;
  try {
    const customerInventory = new CustomerInventory(temp);
    const response = await customerInventory.save();

    const response2 = await CustomerInventory.findOne({
      _id: response._id,
    }).populate('inventory');

    res.status(201).send(response2);
  } catch (err) {
    res.status(400).send(err);
  }
};

const get = async (req, res) => {
  const filters = req.body;
  let limit = 0;
  if (filters.limit) {
    limit = filters.limit;
    delete filters.limit;
  }
  const response = await CustomerInventory.find(filters)
    .populate('customer')
    .populate('inventory')
    .limit(limit);
  res.send(response);
};

const deleteInventoryRequest = async (req, res) => {
  const _id = req.params.id;
  const response = await CustomerInventory.deleteOne({ _id });
  res.send(response);
};

const updateOne = async (req, res) => {
  const _id = req.params.id;
  const filters = req.body;

  const response = await CustomerInventory.updateOne({ _id }, filters);
  res.send(filters);
};

const pushOffers = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;
  const response = await CustomerInventory.updateOne(
    { _id },
    { $push: { offers: data } }
  );
  res.send(response);
};
const deleteOffer = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;
  console.log(_id, 'offer', data._id);
  const response = await CustomerInventory.updateOne(
    { _id },
    { $pull: { offers: { _id: data._id } } }
  );
  res.send(response);
};

module.exports = {
  save,
  get,
  deleteInventoryRequest,
  updateOne,
  pushOffers,
  deleteOffer,
};
