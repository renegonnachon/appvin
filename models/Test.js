const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const TestSchema = new mongoose.Schema(
  {
    outPut: { type: String },
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

const Test = mongoose.model('CreditcardTest', TestSchema);
module.exports = Test;
