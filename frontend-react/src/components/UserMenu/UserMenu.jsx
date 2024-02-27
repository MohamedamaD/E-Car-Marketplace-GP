import React, { Fragment } from "react";
import "./UserMenu.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/slices/authenticationSlice";
import { UserLinks, UserRoles } from "../../constants";
import { Button } from "../Button/Button";
import { BiCar, BiInfoCircle, BiShow } from "react-icons/bi";
export const UserMenu = ({ setOpen }) => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
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
          {user?.isNewUser && (
            <Link
              to="/missing-information"
              className="rounded"
              onClick={() => setOpen(false)}
            >
              <div className="icon">
                <BiInfoCircle />
              </div>
              <span>استكمال البيانات</span>
            </Link>
          )}
          {user?.role === "showroom-owner" && (
            <Link
              to="/showroom-owner"
              className="rounded"
              onClick={() => setOpen(false)}
            >
              <div className="icon">
                <BiShow />
              </div>
              <span>معارضي</span>
            </Link>
          )}
          {user?.role === "seller" && (
            <Link
              to="/my-cars"
              className="rounded"
              onClick={() => setOpen(false)}
            >
              <div className="icon">
                <BiCar />
              </div>
              <span>عربياتي</span>
            </Link>
          )}
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
