const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: { type: String, defaultValue: 'pending' },
  },
  {
    timestamps: true,
  }
);

withdrawSchema.virtual('withdraw', {
  ref: 'Withdraw',
  localField: '_id',
  foreignField: 'owner',
});

withdrawSchema.statics.getAllByOwner = async (filters = {}) => {
  const customers = await Comment.find(filters).owner('addedBy');
  return customers;
};

const Withdraw = mongoose.model('Withdraw', withdrawSchema);
module.exports = Withdraw;
