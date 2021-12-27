const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// commentSchema.statics.getAllByOwner = async (filters = {}) => {
//   const customers = await Comment.find(filters).populate('addedBy');
//   return customers;
// };

const Buyer = mongoose.model('Buyers', BuyerSchema);
module.exports = Buyer;
