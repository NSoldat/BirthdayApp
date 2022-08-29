const express = require("express");
const controller = require("../../controllers/birthdayEvents");

const router = express.Router();

router.get("/:userId/:open?", controller.getAllBirthdayEvents);
router.post("/", controller.addNewEvent);
router.put("/:id", controller.addNewParticipant);

module.exports = router;
