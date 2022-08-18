const mongoose = require('mongoose');
const Present = require('../models/presents');

const getAllPresents = async () => {
    const presents = Present.find({}).exec();
    return presents;
};

const addNewPresent = async (eventId, itemId) => {
    const newPresent = new Present({
        _id: new mongoose.Types.ObjectId(),
        birthdayEventId: eventId,
        presentBought: itemId
    });
    await newPresent.save();
    return newPresent;
};

module.exports = {
    getAllPresents,
    addNewPresent
};