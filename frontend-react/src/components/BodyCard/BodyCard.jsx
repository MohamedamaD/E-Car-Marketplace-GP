import React from "react";
import { TbBrandSpeedtest, TbManualGearbox } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import "./BodyCard.scss";
export const BodyCard = ({ props }) => {
  return (
    <div className="body-container">
      <h1 className="car-model">{props?.model}</h1>
      <p className="p-color car-make">{props?.make}</p>
      <strong className="main-color car-price">
        {props?.price} <span className="p-color">ج.م</span>
      </strong>
      <div className="wrapper">
        <div>
          <TbManualGearbox />
          <span className="p-color">{props?.transmission}</span>
        </div>
        <div>
          <CiCalendarDate />
          <span className="p-color">{props?.year}</span>
        </div>
        <div>
          <TbBrandSpeedtest />
          <span className="p-color">{props?.mileage}</span>
        </div>
      </div>
    </div>
  );
};
