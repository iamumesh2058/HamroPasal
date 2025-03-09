require("express-async-errors");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;


// IMPORTING ROUTES
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");


// IMPORTING MIDDLEWARES
const errorHandlerMiddleware = require("./middlewares/error.handler.middleware");


// USING MIDDLEWARES
if (process.env.NODE_ENV === 'developement') {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use("/public/uploads", express.static("public/uploads"));


// USING ROUTES
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);


// ERROR HANDLERS
app.use("*", (req, res) => {
    res.status(404).json({ err: "This route doesn't exist" });
})

app.use(errorHandlerMiddleware);


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