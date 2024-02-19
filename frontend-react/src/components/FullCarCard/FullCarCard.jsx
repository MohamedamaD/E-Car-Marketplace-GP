import React from "react";
import "./FullCarCard.scss";
import { Alert, BodyCard, Button } from "../";
import { BiLocationPlus } from "react-icons/bi";

export const FullCarCard = ({ props }) => {
  console.log(props);
  return (
    <div className="full-car-card">
      <div className="img-container">
        <img src={props?.image} alt="car" />
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
        <div className="alert-wrapper">
          <Alert type="success" message="في حاله الغاء الحجز هتوصلك رساله" />
        </div>
      </div>
    </div>
  );
};
