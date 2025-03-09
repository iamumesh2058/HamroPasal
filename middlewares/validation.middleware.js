const { body, param, validationResult } = require("express-validator");
const { BadRequestError, NotFoundError } = require("../errors/custom.error");
const mongoose = require("mongoose");
const Category = require("../models/category.model");
const User = require("../models/user.model");


const withValidationError = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map((error) => error.msg);
                throw new BadRequestError(errorMessage[0]);
            }
            next();
        }
    ];
}


// MONGODB ID
exports.validateParam = withValidationError([
    param('id')
        .custom(async (value) => {
            const isValid = await mongoose.Types.ObjectId.isValid(value);
            if (!isValid) throw new BadRequestError("Invalid MongoDB id");
        })
]);


// CATEGORY
exports.validateCategory = withValidationError([
    body('categoryName')
        .notEmpty()
        .withMessage("Category name cannot be empty")
        .isLength({ min: 3 })
        .withMessage("Category name must be altest 3 characters")
        .matches(/^[a-zA-Z]+$/)
        .withMessage("Category name must be only alphabets")
        .custom(async (categoryName) => {
            const category = await Category.findOne({ categoryName });
            if (category) {
                throw new BadRequestError("Category already exists");
            }
        })
]);


// PRODUCT
exports.validateProduct = withValidationError([
    body('productName')
        .notEmpty()
        .withMessage("Product Name is required")
        .isLength({ min: 3 })
        .withMessage("Product name must be alteast 3 characters"),

    body("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Price must be number"),

    body("description")
        .notEmpty()
        .withMessage("Product description is required")
        .isLength({ min: 20 })
        .withMessage("Product description must be alteast 20 characters"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .custom(async (value) => {
            const category = await Category.findById(value);
            if (!category) throw new NotFoundError("Category doesn't exit")
        }),

    body("countInStock")
        .notEmpty()
        .withMessage("Count in stock is required")
        .isNumeric()
        .withMessage("Count in stock must be number")
]);


// REGISTER
exports.validateRegisterInputs = withValidationError([
    body('username')
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be atleast 3 characters")
        .custom(async (username) => {
            const user = await User.findOne({ username });
            if (user) throw new BadRequestError("Username not available");
        }),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) throw new BadRequestError("Email already exists");
        }),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/[a-z]/).withMessage("Password must contain atleast 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must contain atleast 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must contain atleast 1 number")
        .matches(/[+\-*&^%$#@]/).withMessage("Password must contain atleast 1 special character")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
]);


// LOGIN
exports.validateLoginInputs = withValidationError([
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) throw new NotFoundError("Email not registered");
        }),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
]);


// FORGOT PASSWORD
exports.validateForgotPasswordInputs = withValidationError([
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (!user) throw new NotFoundError("Email not registered");
        }),
]);


// RESET PASSWORD
exports.validateResetPasswordInputs = withValidationError([
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/[a-z]/).withMessage("Password must contain atleast 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must contain atleast 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must contain atleast 1 number")
        .matches(/[+\-*&^%$#@]/).withMessage("Password must contain atleast 1 special character")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters")
]);