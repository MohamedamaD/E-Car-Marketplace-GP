import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { TbManualGearbox } from "react-icons/tb";
import "./CarCard.scss";
export const CarCard = (props) => {
  return (
    <div className="car-card">
      <div className="container card-container">
        <div className="img-container">
          <img src={props?.image} alt="car-imag" />
        </div>
        <div className="txt-container">
          <h1 className="car-model">{props?.model}</h1>
          <p className="p-color car-make">{props?.make}</p>
          <strong className="main-color car-price">{props?.price}ج.م</strong>
          <div className="wrapper">
            <div>
              <span>{props?.transmission}</span>
              <span>
                <TbManualGearbox />
              </span>
            </div>
            <div>
              <span>{props?.year}</span>
              <span>
                <CiCalendarDate />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
