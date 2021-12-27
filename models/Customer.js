const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: Number, default: 0 },
    email: { type: String, required: true },
    country: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      default: null,
    },
    balance: { type: Number, default: 0, min: 0 },
    campaign: { type: String, default: 0 },
    userPassword: { type: String, required: true, trim: true },
    autoOffers: { type: Boolean, default: false },
    lastLogin: { type: Date, default: new Date() },
    address: { type: String, default: '', trim: true },
    postalCode: { type: String, default: '', trim: true },
    ville: { type: String, default: '', trim: true },
    createAt: { type: Date, default: new Date() },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
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

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();

  // delete customerObject.userPassword;
  delete customerObject.tokens;
  delete customerObject.__v;

  return customerObject;
};

customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = await jwt.sign(
    { _id: customer._id.toString() },
    'thisismylife',
    {
      expiresIn: '365 days',
    }
  );
  try {
    customer.tokens = customer.tokens.concat({ token });
    await Customer.updateOne({ _id: customer._id }, { tokens: { token } });
  } catch (error) {
    console.log(error);
  }
  return token;
};

customerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({
    email,
    userPassword: password,
  }).populate({ path: 'inventories', populate: { path: 'inventory' } });
  if (!customer) {
    return { message: 'unable to log in email' };
  } else {
    return customer;
  }
};

customerSchema.path('email').validate(async (email) => {
  const count = await mongoose.models.Customer.countDocuments({ email });
  return count === 0;
}, 'Email exists');

customerSchema.virtual('comments', {
  ref: 'Comments',
  localField: '_id',
  foreignField: 'owner',
});

customerSchema.virtual('inventories', {
  ref: 'CustomersInventory',
  localField: '_id',
  foreignField: 'customer',
});

customerSchema.statics.getByOwner = async ({
  filters = { firstName: '' },
  page,
  limit,
  orderBy,
}) => {
  filters = buildFilter(filters);
  let startIndex = (page - 1) * limit;
  const endIntex = page * limit;
  // need to specify a user;
  if (startIndex < 0) startIndex = 0;
  const customers = await Customer.find(filters)
    .sort(orderBy)
    .populate('comments', (err, item) => {})
    .populate('owner')
    .limit(limit)
    .skip(startIndex);

  return customers;
};

customerSchema.statics.getTotalCount = async ({ filters }) => {
  return Customer.countDocuments(buildFilter(filters));
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

const buildFilter = (f) => {
  let filter = {};
  if (f.status !== '-1') {
    filter = { ...filter, status: f.status };
  }
  if (f.country !== '0') {
    filter = { ...filter, country: f.country };
  }
  if (f.campaign !== '-1') {
    filter = { ...filter, campaign: f.campaign };
  }
  if (f.lastName !== '') {
    filter = { ...filter, lastName: { $regex: f.lastName, $options: 'i' } };
  }
  if (f.firstName !== '') {
    filter = { ...filter, firstName: { $regex: f.firstName, $options: 'i' } };
  }

  if (f.phone !== '') {
    filter = { ...filter, phone: { $regex: f.phone, $options: 'i' } };
  }

  if (f.email !== '') {
    filter = { ...filter, email: { $regex: f.email, $options: 'i' } };
  }

  if (f.startDate) {
    const startDate = new Date(new Date(f.startDate).setHours(00, 00, 00));
    filter = {
      ...filter,
      createAt: { $gte: startDate },
    };
  }

  if (f.endDate) {
    const endDate = new Date(new Date(f.endDate).setHours(23, 59, 59));
    filter = {
      ...filter,
      createAt: { $lt: endDate },
    };
  }

  // if (f.owner != null && f.owner !== '0') {
  //   filter = { ...filter, owner: f.owner };
  // } else {
  //   filter = { ...filter, owner: { $exists: f.showAll } };
  // }

  const isValid = ObjectId.isValid(f.owner);

  // seller search.
  if (isValid) {
    filter = { ...filter, owner: f.owner };
  } else {
    // admin search
    if (f.showAll) {
      // show controlled
      filter = { ...filter, owner: { $ne: null } };
      // show uncontrolled
    } else {
      filter = { ...filter, owner: null };
    }
  }

  return filter;
};
