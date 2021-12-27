const mongoose = require('mongoose');

const HeadersSchema = new mongoose.Schema(
  {
    headers: [],
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

const Headers = mongoose.model('Headers', HeadersSchema);
module.exports = Headers;
