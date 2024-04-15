const { body, param, validationResult } = require("express-validator");
const { BadRequestError, NotFoundError } = require("../errors/custom.error");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Category = require("../models/category.model");


const withValiationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map((error) => error.msg);
                throw new BadRequestError(errorMessage[0]);
            }
            next();
        },
    ];
};


exports.validateIdParam = withValiationError([
    param('id').custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new Error('Invalid MongoDB id');
    }),
]);


exports.validateCategory = withValiationError([
    body('categoryName')
        .notEmpty()
        .withMessage("Category name is requried")
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Category name must be only alphabets')
        .custom(async (categoryName) => {
            const category = await Category.findOne({ categoryName });
            if (category) {
                throw new BadRequestError("Category already exists");
            }
        })
]);


exports.validateProduct = withValiationError([
    body('title')
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3 })
        .withMessage('Category must be at least 3 characters'),

    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Price must be a number'),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 20 }).
        withMessage('Description must be at least 20 characters'),

    body('countInStock')
        .notEmpty()
        .withMessage('Count in stock is required')
        .isNumeric()
        .withMessage('Count must be a number'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
]);


exports.validateRegisterInput = withValiationError([
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters')
        .custom(async (username) => {
            const user = await User.findOne({ username });
            if (user) {
                throw new BadRequestError("Username not available");
            }
        }),

    body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Email format incorrect')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError("Email already exists");
            }
        }),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .matches(/[a-z]/).withMessage('Password must consist of at least 1 lowercase alphabet')
        .matches(/[A-Z]/).withMessage('Password must consist of at least 1 uppercase alphabet')
        .matches(/[0-9]/).withMessage('Password must consist of at least 1 number')
        .matches(/[+\-*&^%$#@]/).withMessage('Password must consist of at least 1 special character')
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
]);

exports.validateForgotPassword = withValiationError([
    body("email")
        .notEmpty()
        .withMessage('Please enter email')
        .isEmail()
        .withMessage('Email format incorrect')
])

exports.validateResetPassword = withValiationError([
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .matches(/[a-z]/).withMessage('Password must consist of at least 1 lowercase alphabet')
        .matches(/[A-Z]/).withMessage('Password must consist of at least 1 uppercase alphabet')
        .matches(/[0-9]/).withMessage('Password must consist of at least 1 number')
        .matches(/[+\-*&^%$#@]/).withMessage('Password must consist of at least 1 special character')
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
])


exports.validateLoginInput = withValiationError([
    body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('Email format incorrect')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new BadRequestError("User does not exist");
            }
        }),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]);