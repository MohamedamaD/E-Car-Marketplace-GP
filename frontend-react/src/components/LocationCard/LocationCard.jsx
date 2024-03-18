import React from "react";
import { BiCircle, BiPhone } from "react-icons/bi";
import "./LocationCard.scss";
export const LocationCard = ({ props }) => {
  return (
    <details className="location-details">
      <summary className="main-color">{props?.name}</summary>
      <div className="location-container">
        <p>
          <BiCircle className="main-color" />
          {props?.address}
        </p>
        <p className="phone">
          <BiPhone className="main-color" />
          {props?.phone}
        </p>
      </div>
    </details>
  );
};
