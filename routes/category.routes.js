const express = require("express");
const router = express.Router();

const {
    addCategroy,
    getAllCategories,
    getCategoryDeatils,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");

const { validateCategory, validateIdParam } = require("../middlewares/validation.middleware");
const { authorizePermissions, authenticateUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");


router
    .route('/')
    .post(authenticateUser, authorizePermissions("admin"), upload.single('image'), validateCategory, addCategroy)
    .get(getAllCategories);


router
    .route('/:id')
    .get(validateIdParam, getCategoryDeatils)
    .put(authenticateUser, authorizePermissions("admin"), upload.single('image'), validateIdParam, validateCategory, updateCategory)
    .delete(authenticateUser, authorizePermissions("admin"), validateIdParam, deleteCategory);



module.exports = router;