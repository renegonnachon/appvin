const mongoose = require('mongoose');
const CustomersSwitchLogsSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    ownerFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    ownerTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

const switchCustomersLogs = mongoose.model(
  'CustomersSwitchLogs',
  CustomersSwitchLogsSchema
);

module.exports = switchCustomersLogs;
