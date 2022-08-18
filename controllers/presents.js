const presentService = require("../services/presents");

const addNewPresent = async (req, res, next) => {
    const { eventId, itemId} = req.body;
    try {
    if (!eventId || !itemId) {
        const error = new Error("Check the forwarded data!");
        error.status = 400;
        throw error;
    } else {
        const newPresent = await presentService.addNewPresent(eventId, itemId);
        res.status(201).json(newPresent);
    }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addNewPresent
}