const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  amount: {
    type: Number,
    default: 500
  },
  message: {
    type: String
  }

});

const Payment = mongoose.model('payments', paymentsSchema);

module.exports = Payment;

