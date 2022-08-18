const mongoose = require('mongoose');
const Item = require('../models/items');

const getAllItems = async () => {
    const items = await Item.find({}).exec();
    return items;
};

const getItemById = async (id) => {
    const item = await Item.find({_id: id}).exec();
    return item;
}

const addNewItem = async (name, urlLink) => {
    const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        name,
        urlLink
    });
    await newItem.save();
    return newItem;
};


const deleteItem = async (id) => {
    await Item.findOneAndDelete({ _id: id}).exec();
};

module.exports = {
    getAllItems,
    getItemById,
    addNewItem, 
    deleteItem
}