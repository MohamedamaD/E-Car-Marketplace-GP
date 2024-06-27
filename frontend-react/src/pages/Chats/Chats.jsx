import React, { useState, useEffect } from "react";
import "./Chats.scss";
import api from "../../services/api";
import { getToken } from "../../utils";
import { useSelector } from "react-redux";
import { Chat } from "../../components";
import { EmptySection } from "../../containers";

export const Chats = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const response = await api.get("/chat/users", {
          headers: { "x-auth-token": token },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };
  console.log(users);
  return (
    <div className="layout-page" id="chats-page">
      {users.length === 0 && (
        <section className="chats-container container">
          <EmptySection title="لا يوجد رسائل" />
        </section>
      )}
      {users.length !== 0 && (
        <div className="chats-container container">
          <div className="users-list">
            <h2>المستخدمين</h2>
            <ul>
              {users.map((user) => (
                <li
                  className="shadow rounded white-bg-color"
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                >
                  <img
                    src={process.env.REACT_APP_ORIGIN_URL + "\\" + user?.avatar}
                    className="rounded"
                    alt="avatar"
                  />
                  <p>{user.username}</p>
                </li>
              ))}
            </ul>
          </div>
          {selectedUser && <Chat owner={selectedUser} />}
        </div>
      )}
    </div>
  );
};
