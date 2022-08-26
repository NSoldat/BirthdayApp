const express = require("express");
const { urlencoded, json } = require("body-parser");
const usersAPI = require("./routes/api/users");
const itemsAPI = require("./routes/api/items");
const eventsAPI = require("./routes/api/birthdayEvents");
const paymentsAPI = require("./routes/api/userPayments");
const presentsAPI = require("./routes/api/presents");
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

const databaseString = process.env.DB_STRING || 'mongodb://localhost:27017/birthdayApp';

mongoose.connect(databaseString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

mongoose.connection.once('open', function(){
    console.log("Successfully connected to the database!");
});

mongoose.connection.on('error', (error) => {
    console.log("Error: ", error);
});

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users/", usersAPI);
app.use("/items/", itemsAPI);
app.use("/events/", eventsAPI);
app.use("/payments/", paymentsAPI);
app.use("/presents/", presentsAPI);


app.use((req, res, next)  => {
    const error = new Error('Request not supported!');
    error.status = 405;
  
    next(error);
});
  
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack,
        },
    });
});
  
module.exports = app;
