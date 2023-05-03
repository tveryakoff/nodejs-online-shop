const multer = require("multer");
const path = require("path");
const rootDir = require("../constants/rootDir");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootDir, 'public', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

module.exports = storage
