const paymentsService = require("../services/userPayments");

const getAllUserPayments = async (req, res, next) => {
    try{
        const allPayments = await paymentsService.getAllUserPayments();
        if(allPayments == null){
            res.status(404).json();
        } else {
            res.status(200).json(allPayments);
        }
    } catch (error){
        next(error);
    }
}

const addNewPayment = async (req, res, next) => {
    const { userId, amount, message} = req.body;
    try {
    if (!userId || !message) {
        const error = new Error("Check the forwarded data!");
        error.status = 400;
        throw error;
    } else {
        const newPayment = await paymentsService.addNewPayment(userId, amount, message);
        res.status(201).json(newPayment);
    }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllUserPayments,
    addNewPayment
}