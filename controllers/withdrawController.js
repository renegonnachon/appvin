const Withdraw = require('../models/Withdraw');

const save = async (req, res) => {
  const w = new Withdraw(req.body);
  const widthdraw = await w.save();
  res.status(201).send(widthdraw);
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const data = await Withdraw.deleteOne({ _id: id });
  res.send(data);
};

const getWitdrawById = async (req, res) => {
  const id = req.params.id;
  const data = await Withdraw.findOne({ owner: id });

  res.send(data);
};

const getAll = async (req, res) => {
  const id = req.params.id;
  const data = await Withdraw.find({})
    .populate('owner')
    .limit(10)
    .sort({ _id: 'desc' });

  res.send(data);
};

const update = async (req, res) => {
  const p = req.body;
  const data = await Withdraw.updateOne({ _id: p._id }, p);

  res.send(data);
};

module.exports = {
  save,
  deleteComment,
  getWitdrawById,
  getAll,
  update,
};
