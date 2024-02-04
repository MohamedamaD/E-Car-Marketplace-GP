import React from "react";
import "./Navbar.scss";
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  return (
    <div className="navbar-container container">
      <Link to="/">
        <div className="brand">
          <img src="" alt="" />
          <h1>اسم الموقع</h1>
        </div>
      </Link>
      <nav className="nav-bar">
        {/* TODO [mohamed] : here implement navbar #note follow layout inside tasks/navbar*/}
        {navLinks.map((navLink, i) => (
          <Link key={navLink.title + i} to={`/${navLink.link}`}>
            {navLink.title}
          </Link>
        ))}
      </nav>
      <nav className="side-bar">
        {/* TODO [somaya] : here implement sidebar  #note follow layout inside tasks/navbar*/}
      </nav>
      <div className="user-profile">
        {isAuthenticated ? (
          <div className="icon-container">
            <BiUser />
          </div>
        ) : (
          <Button value="تسجيل" />
        )}
      </div>
    </div>
  );
};
