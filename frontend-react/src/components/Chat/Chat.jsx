import React, { useState, useEffect } from "react";
import "./Chat.scss";
import io from "socket.io-client";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useSelector } from "react-redux";
import api from "../../services/api";
const socket = io(process.env.REACT_APP_ORIGIN_URL);

export const Chat = ({ owner, children }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { user } = useSelector((state) => state.authentication);
  console.log("this is", user?._id);
  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const response = await api.get(`/chat/messages/${user._id}/${owner}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    fetchMessageHistory();
    return () => {};
  }, [owner]);

  useEffect(() => {
    socket.connect();
    const handleMessage = (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    console.log({
      message: messageInput,
      recipient: owner,
      sender: user?._id,
    });
    socket.emit("sendMessage", {
      message: messageInput,
      recipient: owner,
      sender: user?._id,
    });

    setMessageInput("");
  };

  return (
    <div>
      <div className="chat-container white-bg-color shadow">
        {children}
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="empty-messages">
              <p>لا يوجد رسايل</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === user?._id
                  ? "sender-message"
                  : "receiver-message"
              }`}
            >
              <div className="message-sender">
                {message.sender === user?._id ? "انا" : "هو"}
              </div>
              <div className={`message-content`}>{message.message}</div>
            </div>
          ))}
        </div>
        <div className="message-input-container">
          <Input
            type="text"
            placeholder="اكتب رسالتك"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Button value="ارسال" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
