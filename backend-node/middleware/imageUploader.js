const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user._id;
    const userUploadsFolder = `uploads/${userId}/`;
    fs.mkdirSync(userUploadsFolder, { recursive: true });

    cb(null, userUploadsFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
