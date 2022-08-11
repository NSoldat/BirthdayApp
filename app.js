// App registruje api-je i poziva pomocne funkcije
const express = require("express");
const { urlencoded, json } = require("body-parser");
const usersAPI = require("./routes/api/users");
const mongoose = require('mongoose');

const app = express();

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
})

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users/", usersAPI);

app.use(function (req, res, next) {
    const error = new Error('Request not supported!');
    error.status = 405;
  
    next(error);
  });
  
app.use(function (error, req, res, next) {
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
