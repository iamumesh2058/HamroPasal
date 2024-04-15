const multer = require('multer');
const path = require("path");
const DataParser = require("datauri/parser.js");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content;
}

module.exports = upload;