const itemsService = require('../services/items');

const getAllItems = async (req, res, next) => {
    try {
        const allItems = await itemsService.getAllItems();
        res.status(200).json(allItems);
      } catch (error){
        next(error);
      }
}

const getItemById = async (req, res, next) => {
    const { id } = req.body;
    try{
        if(!id){
            const error = new Error("Check the forwarded data!");
            error.status = 400;
            throw error;
        } else {
            const item = await itemsService.getItemById(id);
            res.status(200).json(item);
        }
    } catch (error) {
        next(error);
    }
};

const addNewItem = async (req, res, next) => {
    const { name, urlLink } = req.body;
    try {
    if (!name) {
        const error = new Error("Check the forwarded data!");
        error.status = 400;
        throw error;
    } else {
      const newItem = await itemsService.addNewItem(name, urlLink);
      res.status(201).json(newItem);
    }
    } catch (error) {
        next(error);
    }
  };
  
  const deleteItem = async (req, res, next) => {
    const { _id } = req.body;
    try {
        if(!_id) {
            const error = new Error("Check the forwarded data!");
            error.status = 400;
            throw error;
        } else {
            const deletedItem = await itemsService.deleteItem(_id);
            res.status().json(deleteItem);
        }
    } catch (error) {
        next(error);
    }
  };

  module.exports = {
    getAllItems,
    getItemById,
    addNewItem,
    deleteItem
  }