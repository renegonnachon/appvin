const mongoose = require('mongoose');
const CustomersInventorySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
    },
    status: { type: Number, default: 0 },
    expiration: { type: Date, required: true },
    offers: { type: Array, default: [] },
  },
  { timestamps: true }
);

const CustomersInventory = mongoose.model(
  'CustomersInventory',
  CustomersInventorySchema
);

module.exports = CustomersInventory;
