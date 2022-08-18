const mongoose = require('mongoose');

const presentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  birthdayEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events'
  },
  presentBought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }
});

const Present = mongoose.model('presents', presentsSchema);

module.exports = Present;

