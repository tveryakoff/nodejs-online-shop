const multer = require("multer");
const path = require("path");
const rootDir = require("../constants/rootDir");


const storage = multer.diskStorage({
  destination: path.join(rootDir, 'assets', 'public', 'uploads'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

module.exports = storage
