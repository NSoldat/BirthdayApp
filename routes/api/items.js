const express = require("express");
const controller = require("../../controllers/items");

const router = express.Router();

router.get("/", controller.getAllItems);

router.post("/", controller.addNewItem);

router.get("/:id", controller.getItemById);

router.delete("/:id", controller.deleteItem);

module.exports = router;
