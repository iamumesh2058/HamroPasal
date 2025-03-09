const express = require('express');
const router = express.Router();

const {
    addCategory,
    getAllCategories,
    getCategoryDetails,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");
const { validateCategory, validateParam } = require('../middlewares/validation.middleware');
const { authenticateUser, authorizePermissions } = require('../middlewares/auth.middleware');
const upload = require("../middlewares/multer.middleware");


router.post("/addCategory", authenticateUser, authorizePermissions('admin'), upload.single("image"), validateCategory, addCategory);
router.get("/getAllCategories", getAllCategories);
router.get("/getCategoryDetails/:id", authenticateUser, authorizePermissions('admin'), validateParam, getCategoryDetails);
router.put("/updateCategory/:id", authenticateUser, authorizePermissions('admin'),validateParam, validateCategory, updateCategory);
router.delete("/deleteCategory/:id", authenticateUser, authorizePermissions('admin'),validateParam, deleteCategory);


module.exports = router;