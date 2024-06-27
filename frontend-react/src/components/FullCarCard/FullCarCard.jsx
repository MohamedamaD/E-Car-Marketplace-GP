import React, { useState } from "react";
import "./FullCarCard.scss";
import { Alert, BodyCard, Button, Chat } from "../";
import { BiAbacus, BiLocationPlus, BiX } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

export const FullCarCard = ({ props }) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.authentication
  );
  const history = useHistory();
  console.log(props);
  const [isOpen, setOpen] = useState(false);
  
  const bookHandler = async (event) => {
    const res = await api.post(`/cars/${props._id}/book`, { value: true });
    if (res.status === 200) {
      history.go(0);
    }
    console.log(res.data.car);
  };
  const unBookHandler = async (event) => {
    const res = await api.post(`/cars/${props._id}/book`, { value: false });
    if (res.status === 200) {
      history.go(0);
    }
    console.log(res.data.car);
  };

  return (
    <div className="full-car-card">
      <div className="img-container">
        <img
          src={`${process.env.REACT_APP_ORIGIN_URL}/${props?.images[0]}`}
          alt="car"
        />
      </div>
      <div className="txt-container shadow rounded">
        <BodyCard props={props} />
        <div className="wrapper-container">
          <span className="title p-color">العنوان</span>
          <p>
            <BiLocationPlus className="main-color" />
            <span>{props?.address}</span>
          </p>
        </div>
        <div className="wrapper-container">
          <span className="title p-color">الترخيص</span>
          <p>
            <BiAbacus className="main-color" />
            <span>{props?.license}</span>
          </p>
        </div>
        <div className="features-container">
          <span className="title p-color">ممزيات اضافيه</span>
          <div>
            {props?.features.map((el, i) => (
              <span className="black-color" key={i}>
                {el}
              </span>
            ))}
          </div>
        </div>
        <div className="button-container">
          {!props?.booked && (
            <Button
              value="حجز؟"
              className="white-bg-color black-color shadow"
              onClick={bookHandler}
            />
          )}
          {props?.booked && (
            <Button
              value="الغاء حجز؟"
              onClick={unBookHandler}
              className="main-bg-color white-color shadow"
            />
          )}
        </div>
        {isAuthenticated && (
          <Button
            value="مراسله صاحب العربيه"
            className="chat-button secondary-bg-color"
            onClick={() => setOpen(true)}
          />
        )}

        {isOpen && isAuthenticated && (
          <div>
            <Chat owner={props?.owner}>
              <BiX className="exit-icon" onClick={() => setOpen(false)} />
            </Chat>
          </div>
        )}
        <div className="alert-wrapper">
          {props?.booked && (
            <Alert type="success" message="في حاله الغاء الحجز هتوصلك رساله" />
          )}
        </div>
      </div>
    </div>
  );
};
