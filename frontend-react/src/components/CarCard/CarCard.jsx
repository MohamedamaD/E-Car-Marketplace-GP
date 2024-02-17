import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { TbManualGearbox } from "react-icons/tb";
import "./CarCard.scss";
export const CarCard = ({ props }) => {
  return (
    <div className="car-card">
      <div className="card-container">
        <div className="img-container">
          <img src={props?.image} alt="car-imag" />
        </div>
        <div className="txt-container">
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
          </div>
        </div>
      </div>
    </div>
  );
};
