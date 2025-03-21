const express = require("express");
const router = express.Router();

const {
    addProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct,
    getCategoryProducts,
} = require("../controllers/product.controller");

const upload = require("../middlewares/multer.middleware");
const { validateParam, validateProduct } = require("../middlewares/validation.middleware");
const { authenticateUser, authorizePermissions } = require("../middlewares/auth.middleware");

router.post("/addProduct", authenticateUser, authorizePermissions("admin"), upload.single('image'), validateProduct, addProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductDetails/:id", validateParam, getProductDetails);
router.get("/getCategoryProducts/:id", validateParam, getCategoryProducts);
router.put("/updateProduct/:id", authenticateUser, authorizePermissions("admin"), validateParam, validateProduct, updateProduct);
router.delete("/deleteProduct/:id", authenticateUser, authorizePermissions("admin"), validateParam, deleteProduct);

module.exports = router;