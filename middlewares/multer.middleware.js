// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         let filepath = 'public/uploads';
//         if (!fs.existsSync(filepath)) {
//             fs.mkdirSync(filepath, { recursive: true });
//         }
//         cb(null, filepath);
//     },
//     filename: (req, file, cb) => {
//         const extension = path.extname(file.originalname);
//         let filename = path.basename(file.originalname, extension);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

//         filename += '-' + uniqueSuffix + extension;

//         cb(null, filename);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (!file.originalname.match(/[.](jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)) {
//         return cb(new Error("Invalid image format"), false);
//     }
//     cb(null, true);
// }


// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 2000000
//     }
// });


// module.exports = upload;


const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;