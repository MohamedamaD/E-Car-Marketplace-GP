const express = require("express");
const router = express.Router();
const showroomOwnerController = require("../controllers/showroomOwner/showroomOwnerController");
const authenticateUser = require("../middleware/authenticateUser");

router.get(
  "/showrooms",
  authenticateUser,
  showroomOwnerController.getShowrooms
);
router.post("/add-car", showroomOwnerController.addCarToShowroom);
router.put("/update/:carId", showroomOwnerController.updateCarShowroom);
router.delete("/remove/:carId", showroomOwnerController.removeCarFromShowroom);

module.exports = router;
