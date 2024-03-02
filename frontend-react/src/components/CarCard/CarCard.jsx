import React from "react";
import "./CarCard.scss";
import { BodyCard } from "../";

export const CarCard = ({ props }) => {
  return (
    <div className="car-card">
      <div className="card-container">
        <div className="img-container">
          <img
            src={`${process.env.REACT_APP_ORIGIN_URL}/${props?.images[0]}`}
            alt="car-imag"
          />
        </div>
        <BodyCard props={props} />
      </div>
    </div>
  );
};
