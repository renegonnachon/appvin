const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    headers: [],
    name: { type: String, default: 'Group Name' },
    items: [],
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

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
3