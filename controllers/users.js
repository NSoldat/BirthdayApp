const usersService = require("../services/users");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await usersService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error){
    next(error);
  }
};

const getUserByName = async (req, res, next) => {
  const name = req.params.name;
  try {
    if (name == undefined) {
      const error = new Error('Missing a user name!');
      error.status = 400;
      throw error;
    }

    const user = await usersService.getUserByName(name);
    if(user == null) {
      res.status(404).json();
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const getUsersWithUpcomingBirthdays = async (req, res, next) => {
  try{
    const usersWithUpcomingBirthdays = await usersService.getUsersWithUpcomingBirthdays();
    if(usersWithUpcomingBirthdays == null) {
      res.status(404).json();
    } else {
      res.status(200).json(usersWithUpcomingBirthdays);
    }

  } catch (error) {
    next(error);
  }
};

const addNewUser = async (req, res, next) => {
  const { name, birthDate, wishList } = req.body;
  try {
  if (!name || !birthDate || !wishList) {
      const error = new Error("Check the forwarded data!");
      error.status = 400;
      throw error;
  } else {
    const newUser = await usersService.addNewUser(name, birthDate, wishList);
    res.status(201).json(newUser);
  }
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getAllUsers,
  getUsersWithUpcomingBirthdays,
  getUserByName,
  addNewUser,
};
