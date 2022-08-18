const express = require("express");
const controller = require("../../controllers/userPayments");

const router = express.Router();

router.get("/", controller.getAllUserPayments);
router.post("/", controller.addNewPayment);

module.exports = router;