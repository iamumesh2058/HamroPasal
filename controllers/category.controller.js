const Category = require("../models/category.model");
const { NotFoundError } = require("../errors/custom.error");
const formatImage = require("../middlewares/image.buffer.middleware");
const cloudinary = require("cloudinary");

// CREATE CATEGORY
exports.addCategroy = async (req, res) => {
    console.log(req.file);
    if (req.file) {
        const file = formatImage(req.file);

        const response = await cloudinary.v2.uploader.upload(file);

        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id;
    }
    const newCategory = await Category.create(req.body);
    res.status(200).json({msg : "Category created successfully"});
};

// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find();
    res.status(200).json({ categories });
};

// GET CATEGORY DEATAILS
exports.getCategoryDeatils = async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(`No catif (req.file && updatedCategory.imagePublicId) {
        await cloudinary.v2.uploader.destroy(updatedCategory.imagePublicId);
    }egory with id ${value}`);
    res.status(200).json({ category });
};

// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
    const newCategory = { ...req.body };
    if (req.file) {
        const file = formatImage(req.file);

        const response = await cloudinary.v2.uploader.upload(file);

        newCategory.image = response.secure_url;
        newCategory.imagePublicId = response.public_id;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        newCategory
    );
    

    if (!updatedCategory) throw new NotFoundError(`No category with id ${value}`);
    res.status(200).json({ msg: "Category updated successfully" });
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw new NotFoundError(`No category with id ${value}`);
    res.status(200).json({ msg: "Category deleted successfully" });
};
