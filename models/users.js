const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, 
    required: true
  },
  birthDate: {
    type: Date, 
    required: true
  },
  wishList: {
   type: [String] 
  }
});

const User = mongoose.model('users', usersSchema);

module.exports = User;

