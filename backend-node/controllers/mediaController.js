const createBanner = (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = req.file.path;
  res.json({ success: true, filePath });
};
module.exports = {
  createBanner,
};
