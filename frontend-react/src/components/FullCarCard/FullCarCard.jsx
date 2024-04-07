import React, { useState } from "react";
import "./FullCarCard.scss";
import { Alert, BodyCard, Button, Chat } from "../";
import { BiAbacus, BiLocationPlus } from "react-icons/bi";
import { useSelector } from "react-redux";

export const FullCarCard = ({ props }) => {
  const { isAuthenticated } = useSelector((state) => state.authentication);

  console.log(props);
  const [isOpen, setOpen] = useState(false);
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
            <span>هذا عنوان سوف يتم تغيره بالاصلي لاحقا</span>
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
          <Button value="حجز؟" className="white-bg-color black-color shadow" />
          <Button
            value="اطلب زياره"
            className="main-bg-color white-color shadow"
          />
        </div>
        {isAuthenticated && (
          <Button
            value="مراسله صاحب العربيه"
            className="chat-button secondary-bg-color"
            onClick={() => setOpen(true)}
          />
        )}

        {isOpen && isAuthenticated && <Chat owner={props?.owner} />}
        <div className="alert-wrapper">
          <Alert type="success" message="في حاله الغاء الحجز هتوصلك رساله" />
        </div>
      </div>
    </div>
  );
};
