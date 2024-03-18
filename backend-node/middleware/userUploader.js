const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user._id;
    const userUploadsDir = `uploads/users/${userId}`; // path.join("uploads", "users", userId.toString());

    if (!fs.existsSync(userUploadsDir)) {
      fs.mkdirSync(userUploadsDir, { recursive: true });
    }

    cb(null, userUploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "license-img-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
