const express = require("express");
const controller = require("../../controllers/users");

const router = express.Router();

router.get("/", controller.getAllUsers);

router.get("/birthdays/", controller.getUsersWithUpcomingBirthdays);

router.get("/:id", controller.getUserById);

router.post("/", controller.addNewUser);

router.put("/:id", controller.addItemToWishList);

module.exports = router;
