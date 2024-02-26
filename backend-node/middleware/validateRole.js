module.exports = function (req, res, next) {
  const user = req.user;
  if (user.role === "seller") {
  } else if (user.role === "showroom-owner") {
    const { showroomId, locationId } = req.body;
    if (!showroomId || !locationId) {
      return res.status(409).json({
        message: "empty location or showroom",
      });
    }
  } else if (user.role === "buyer") {
    return res.status(409).json({ message: "buyer role can't access" });
  } else {
    return res.status(409).json({ message: "invalid role" });
  }

  try {
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Role" });
  }
};
