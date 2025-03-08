const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;


// IMPORTING ROUTES



// IMPORTING MIDDLEWARES


// USING MIDDLEWARES


// USING ROUTES


// ERROR HANDLERS


// DATABASE CONNECTION AND SERVER
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(port, () => {
            console.log(`App running at http://127.0.0.1:${port}`);
        });
    })
    .catch((error) => {
        console.log("Error during database connection ", error);
    });