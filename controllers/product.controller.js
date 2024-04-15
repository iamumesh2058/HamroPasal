const { NotFoundError } = require("../errors/custom.error");
const Product = require("../models/product.model");
const formatImage = require("../middlewares/image.buffer.middleware");
const cloudinary = require("cloudinary");

// ADD PRODUCT
exports.addProduct = async (req, res) => {
	if (req.file) {
		const file = formatImage(req.file);

		const response = await cloudinary.v2.uploader.upload(file);

		req.body.image = response.secure_url;
		req.body.imagePublicId = response.public_id;
	}

	let product = await Product.create(req.body);
	res.status(201).json({ msg: "Product added successfully" });
};

// GETL ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
	let products = await Product.find().populate("category", "categoryName").sort('-createdAt');
	res.status(200).json({ products });
};

// GET PRODUCT DETAILS
exports.getProductDetails = async (req, res) => {
	let product = await Product.findById(req.params.id).populate(
		"category",
		"categoryName"
	);
	if (!product) throw new NotFoundError(`No product with id ${req.params.id}`);
	res.status(200).json({ product });
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
	const newProduct = { ...req.body };
	if (req.file) {
		const file = formatImage(req.file);

		const response = await cloudinary.v2.uploader.upload(file);

		newProduct.image = response.secure_url;
		newProduct.imagePublicId = response.public_id;
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		newProduct
	);

	if (req.file && updatedProduct.imagePublicId) {
		await cloudinary.v2.uploader.destroy(updatedProduct.imagePublicId);
	}

	if (!updatedProduct) throw new NotFoundError(`No product with id ${value}`);
	res.status(200).json({ msg: "Product updated successfully"});
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
	let product = await Product.findByIdAndDelete(req.params.id);
	if (!product) throw new NotFoundError(`No product with id ${value}`);
	res.status(200).json({ msg: "Product deleted successfully" });
};
