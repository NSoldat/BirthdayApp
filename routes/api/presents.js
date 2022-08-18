const express = require("express");
const controller = require("../../controllers/presents");

const router = express.Router();

router.post("/", controller.addNewPresent);

module.exports = router;