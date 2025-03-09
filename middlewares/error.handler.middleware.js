const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const err = error.message || "Something went wrong, try again";
    res.status(statusCode).json({ err });
}

module.exports = errorHandlerMiddleware;