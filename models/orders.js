const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  guest_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  }],
  total_amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  order_date: {
    type: Date,
    default: Date.now
  }
});

const order = mongoose.model('order', orderSchema);

module.exports = order;