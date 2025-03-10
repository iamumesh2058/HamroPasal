const Category = require("../models/category.model");
const Product = require("../models/product.model");
const { NotFoundError, BadRequestError } = require("../errors/custom.error");
const formatImage = require("../utils/image.buffer.utils");
const cloudinary = require("cloudinary");


// ADD CATEGORY
exports.addCategory = async (req, res) => {
    if (!req.file) {
        throw new BadRequestError("Category image is required");
    } else {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file, {
            folder: "HamroPasal/Category"
        });

        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id;
    }

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
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(`No category with id ${req.params.id}`);

    if (req.file) {
        // delete previous image
        await cloudinary.v2.uploader.destroy(category.imagePublicId);

        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);

        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id;
    }

    await Category.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.status(200).json({ msg: "Category updated successfully" });
}


// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) throw new NotFoundError(`No category with id ${req.params.id}`);

    // delete category image
    if (category.imagePublicId) {
        await cloudinary.v2.uploader.destroy(category.imagePublicId);
    }

    // find all products
    const products = await Product.find({ category: req.params.id });

    // delete each product's image from cloudinary
    for (const product of products) {
        if (product.imagePublicId) {
            await cloudinary.v2.uploader.destroy(product.imagePublicId);
        }
    }

    // delete all associated products
    await Product.deleteMany({ category: req.params.id });

    // delete category
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: "Category and products associated with category deleted successfully" });
}