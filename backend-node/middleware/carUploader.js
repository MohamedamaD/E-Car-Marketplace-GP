const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user._id;
    const userUploadsDir = `uploads/users/${userId}/cars`;

    if (!fs.existsSync(userUploadsDir)) {
      fs.mkdirSync(userUploadsDir, { recursive: true });
    }

    cb(null, userUploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file?.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
