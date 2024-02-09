import React from "react";
import "./BottomNavbar.scss";
import { Link, useLocation } from "react-router-dom";
import { staticLinks } from "../../constants";

export const BottomNavbar = () => {
  const loc = useLocation().pathname.substr(1);
  return (
    <div className="bottom-navbar">
      <div className="container">
        <nav>
          {staticLinks.map((item, index) => (
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
