const mongoose = require('mongoose');
const CustomersLogsSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

const CustomersLogs = mongoose.model('CustomersLogs', CustomersLogsSchema);

module.exports = CustomersLogs;
