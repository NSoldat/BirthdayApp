// Objekat za rutiranje definise spisak svih putanja,
// ne treba da implementira to rutiranje, vec samo da zna koja ce funkcija biti pozvana
const express = require("express");
const controller = require("../../controllers/users");

const router = express.Router();

router.get("/", controller.getAllUsers);

router.get("/birthdays/", controller.getUsersWithUpcomingBirthdays);

router.get("/:name", controller.getUserByName);

router.post("/", controller.addNewUser);

module.exports = router;
