const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema(
  {
    itemType: { type: Number, default: 0 },
    itemText: {},
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem;
