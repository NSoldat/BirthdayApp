const Payment = require('../models/userPayments');

const getAllUserPayments = async () => {
    return Payment.find({}).exec();
}

const getPaymentByUserId = async (id) => {
    const foundPayment = Payment.findById(id).exec();
    return foundPayment;
}

const addNewPayment = async (userId, amount, message) => {
    const newUserPayment = new Payment({
        _id: userId,
        amount,
        message
    });

    await newUserPayment.save();
    return newUserPayment;
};

module.exports = {
    getAllUserPayments,
    addNewPayment,
    getPaymentByUserId
   
}