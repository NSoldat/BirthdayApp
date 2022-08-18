const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true
  },
  urlLink: {
   type: String 
  }
});

const Item = mongoose.model('items', itemsSchema);

module.exports = Item;

