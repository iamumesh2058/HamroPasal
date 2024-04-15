const errorHandlerMiddlware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const err = error.message || "Something went wrong, try agian later";
    res.status(statusCode).json({ err });
}

module.exports = errorHandlerMiddlware;