const mongoose = require('mongoose');
const User = require('../models/users');

const getAllUsers = async () => {
    const users = await User.find({}).exec();
    return users;
}
const getUserByName = async (name) => {
    const foundUser = await User.findOne({name: name}).exec();
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

module.exports = {
    getAllUsers,
    getUserByName,
    getUsersWithUpcomingBirthdays,
    addNewUser
}