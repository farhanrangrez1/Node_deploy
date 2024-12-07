const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = upload;


















// is code me file ko set kar rahe hia ye bhi chal raha hia aur wo bhi chal raha hai
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadsDir = path.join(__dirname, "../uploads");

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png/; 
//   const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedFileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true); 
//   } else {
//     cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));है
//   }
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
// });

// module.exports = upload;
