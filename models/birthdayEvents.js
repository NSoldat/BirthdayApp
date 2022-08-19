const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  birthdayPerson: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'payments',
    required: true
  },
  eventCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  totalMoneyAmount: {
    type: Number,
    required: true, 
    default: 0
  },
  notes: {
    type: String,
    default: ""
  }
});

const Event = mongoose.model('events', eventsSchema);

module.exports = Event;

