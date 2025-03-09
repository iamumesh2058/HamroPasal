const Product = require("../models/product.model");
const { NotFoundError } = require("../errors/custom.error");


// ADD PRODUCT
exports.addProduct = async (req, res) => {
    if (!req.file) throw new NotFoundError("Product Image is required");
    req.body.image = req.file?.path;
    const product = await Product.create(req.body);
    res.status(201).json({ msg: "Product added successfully" });
}


// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    const products = await Product.find().populate("category", "categoryName");
    if (!products) throw new NotFoundError("Products not found");
    res.status(200).json({ products });
}


// GET PRODUCT DETAILS
exports.getProductDetails = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category", "categoryName");
    if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);
    res.status(200).json({ product });
}


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);
    res.status(200).json({ msg: "Product updated successfully" });
}


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);
    res.status(200).json({ msg: "Product Deleted successfully" });
}