const mongoose = require('mongoose');
const User = require('../models/users');
const itemsService = require('../services/items');

const getAllUsers = async (userId) => {
    const users = await User.find({}).where("_id").ne(userId).populate("wishList").exec();
    return users;
}

const getUserIdByUserName = async (name) => {
    const foundUser = await User.findOne({name: name}).exec();
    const userId = foundUser._id;
    return userId;
}

const getUserById = async (id) => {
    const foundUser = await User.findOne({_id: id}).populate("wishList").exec();
    return foundUser;
};


const getUsersWithUpcomingBirthdays = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const foundUsers = await User.find({}).exec();

  const usersWithUpcomingBirthdays = foundUsers.filter((user) => {
    const birthDate = user.birthDate;
    const birthdayMonth = birthDate.getMonth();
    const birthdayDay = birthDate.getDate();

    return birthdayMonth > currentMonth ||
    (birthdayMonth == currentMonth && birthdayDay > currentDay);
  });

  return usersWithUpcomingBirthdays.length > 0 ? usersWithUpcomingBirthdays : null;
}

const addNewUser = async (name, birthDate, wishList) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        birthDate,
        wishList
    });

    await newUser.save();
    return newUser;
}

const addItemToWishList = async (itemId, userId) => {
    const foundUser = await User.findById(userId).exec();
    console.log(foundUser); 
    const foundItem = await itemsService.getItemById(itemId);
    console.log(foundItem);
    foundUser.wishList.push(itemId);
    await foundUser.save();
    return foundUser;
}

module.exports = {
    getAllUsers,
    getUserIdByUserName,
    getUserById,
    getUsersWithUpcomingBirthdays,
    addNewUser,
    addItemToWishList
}