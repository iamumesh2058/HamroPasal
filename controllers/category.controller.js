const Category = require("../models/category.model");
const Product = require("../models/product.model");
const { NotFoundError, BadRequestError } = require("../errors/custom.error");


// ADD CATEGORY
exports.addCategory = async (req, res) => {
    if(!req.file) throw new BadRequestError("Category image is required");
    req.body.image = req.file?.path;

    const category = await Category.create(req.body);
    res.status(201).json({ msg: "Category Added successfully" });
}


// GET ALL CATEGORIES
exports.getAllCategories = async (req, res) => {
    const categories = await Category.find();
    if (!categories) throw new NotFoundError(`Categories not found`);
    res.status(200).json({ categories });
}


// GET CATEGORY DETAILS
exports.getCategoryDetails = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(`No category with id ${req.params.id}`);
    res.status(200).json({ category });
}


// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!category) throw new NotFoundError(`No category with id ${req.params.id}`);
    res.status(200).json({ msg: "Category updated successfully" });
}


// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(`No category with id ${req.params.id}`);

    await Product.deleteMany({ category: req.params.id });
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "Category and products associated with category deleted successfully" });
}