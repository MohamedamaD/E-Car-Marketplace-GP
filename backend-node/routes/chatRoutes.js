const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticateUser = require("../middleware/authenticateUser");

router.post("/send-message", chatController.sendMessage);

router.get("/messages/:userId/:recipientId", chatController.getMessages);
router.get("/users", authenticateUser, chatController.getUsersWithMessages);

module.exports = router;
