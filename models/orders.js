const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  products: [
    {
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  total_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now
  }
});

const order = mongoose.model('order', orderSchema);

module.exports = order;