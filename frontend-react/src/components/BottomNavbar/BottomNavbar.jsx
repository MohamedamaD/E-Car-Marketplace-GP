import React from "react";
import "./BottomNavbar.scss";
import { Link, useLocation } from "react-router-dom";

export const BottomNavbar = ({ links }) => {
  const loc = useLocation().pathname.substr(1);

  return (
    <div className="bottom-navbar">
      <div className="container">
        <nav>
          {links.map((item, index) => (
            <Link
              to={item.link}
              className={loc === item.link ? "active" : "p-color"}
              key={index * 2 + 1}
            >
              <item.Icon />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
