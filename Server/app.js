const express = require("express");
const router = require("./src/routes/api");
const app = new express();

const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const mongoSanitize =  require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");


let URL = "mongodb+srv://<db_username>:<db_password>@cluster0.izzbewl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let options = {
    user: "ecommerce",
    pass: "QxLlpwkKb78rwC4m",
    authSource: "admin", // or the database name where the user is created
    useNewUrlParser: true, // Ensure the connection string parser is used
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
};

mongoose.connect(URL, options).then((res) => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
});


// middlewares

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const limiter = rateLimit({windowMs:15*60*1000, max:3000});
app.use(limiter);

app.use("/api/v1", router);

module.exports = app;