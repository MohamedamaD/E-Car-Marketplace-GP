import React, { Fragment } from "react";
import "./UserMenu.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "../../store/slices/authenticationSlice";
import { UserLinks } from "../../constants";
import { Button } from "../Button/Button";
export const UserMenu = ({ setOpen }) => {
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    dispatch(signOut());
    setOpen(false);
  };
  return (
    <Fragment>
      <div className="touch-overlay" onClick={() => setOpen(false)}></div>
      <div className="user-menu shadow">
        <nav>
          {UserLinks.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="rounded"
              onClick={() => setOpen(false)}
            >
              <div className="icon">{item.Icon}</div>
              <span>{item.title}</span>
            </Link>
          ))}

          <Button onClick={clickHandler} value="تسجيل خروج"></Button>
        </nav>
      </div>
    </Fragment>
  );
};
