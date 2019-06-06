const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
const user = require("./routes/user")



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 

mongoose.connect("mongodb+srv://Andrewlastrapes:6yvnpip5qpNmKB0R@cluster0-vzlyd.mongodb.net/test?retryWrites=true", () => 
  console.log("connected to db"))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/user", user)


app.listen(3001, () => {
    console.log('listening');
})