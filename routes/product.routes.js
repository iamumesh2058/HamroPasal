const express = require("express");
const {
    addProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");

const { validateIdParam, validateProduct } = require("../middlewares/validation.middleware");
const { authorizePermissions, authenticateUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router
    .route('/')
    .post(authenticateUser, authorizePermissions(['admin']), upload.single('image'), validateProduct, addProduct)
    .get(getAllProducts);

router
    .route('/:id')
    .get(validateIdParam, getProductDetails)
    .put(authorizePermissions(['admin', 'sellers']), validateIdParam, upload.single('image'), validateProduct, updateProduct)
    .delete(authorizePermissions(['admin', 'sellers']), validateIdParam, deleteProduct);

module.exports = router;