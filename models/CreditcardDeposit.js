const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const CreditSchema = new mongoose.Schema(
  {
    user: { type: String },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    wallet_address: { type: String },
    crypto: { type: String },
    fiat: { type: String },
    status: { type: String },
    status_string: { type: String },
    hash: { type: String },
    meta: { type: Object },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

const CreditcardDeposit = mongoose.model('CreditcardHistory', CreditSchema);
module.exports = CreditcardDeposit;
