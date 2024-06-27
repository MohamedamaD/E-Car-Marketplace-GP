const ChatMessage = require("../models/chatMessage");
const User = require("../models/User");

const socketIO = require("socket.io");
const io = socketIO();

exports.sendMessage = async (req, res) => {
  try {
    const message = new ChatMessage({
      sender: req.body.sender,
      recipient: req.body.recipient,
      message: req.body.message,
    });

    await message.save();

    io.emit("newMessage", message);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      $or: [
        { sender: req.params.userId, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.params.userId },
      ],
    }).sort({ timestamp: 1 });
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsersWithMessages = async (req, res) => {
  try {
    const senderIds = await ChatMessage.distinct("sender", {
      recipient: req.user._id,
    });
    const recipientIds = await ChatMessage.distinct("recipient", {
      sender: req.user._id,
    });

    const uniqueUserIds = [...new Set([...senderIds, ...recipientIds])];

    const users = await User.find({ _id: { $in: uniqueUserIds } });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users with messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
