const mongoose = require('mongoose');

const DepostLogsSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    depositType: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    isWithDeposit: { type: Boolean, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// commentSchema.statics.getAllByOwner = async (filters = {}) => {
//   const customers = await DepostLogs.find(filters).populate('addedBy');
//   return customers;
// };

const DepostLogs = mongoose.model('DepositsLogs', DepostLogsSchema);
module.exports = DepostLogs;
