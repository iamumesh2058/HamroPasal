const Product = require("../models/product.model");
const { NotFoundError } = require("../errors/custom.error");
const formatImage = require("../utils/image.buffer.utils");
const cloudinary = require("cloudinary");


// ADD PRODUCT
exports.addProduct = async (req, res) => {
    if (!req.file) {
        throw new NotFoundError("Product Image is required");
    } else {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file, {
            folder: "HamroPasal/Products"
        });

        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id
    }

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
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);

    if(req.file) {
        // delete previous image
        await cloudinary.v2.uploader.destroy(product.imagePublicId);

        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);

        req.body.image = response.secure_url;
        req.body.imagePublicId = response.poublic_id;
    }

    await Product.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    
    res.status(200).json({ msg: "Product updated successfully" });
}


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);

    await cloudinary.v2.uploader.destroy(product.imagePublicId);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product Deleted successfully" });
}