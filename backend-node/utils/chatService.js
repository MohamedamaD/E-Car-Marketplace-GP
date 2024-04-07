const ChatMessage = require("../models/chatMessage");

async function sendMessage(message, io) {
  try {
    const newMessage = new ChatMessage({
      sender: message.sender,
      recipient: message.recipient,
      message: message.message,
    });
    await newMessage.save();
    io.emit("newMessage", message);
  } catch (error) {
    console.error("Error saving message:", error);
  }
}

module.exports = {
  sendMessage,
};
