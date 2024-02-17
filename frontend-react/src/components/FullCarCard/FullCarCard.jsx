import React from "react";

export const FullCarCard = ({ props }) => {
  return (
    <div className="full-car-card">
      <div className="img-container">
        <img src={props?.image} alt="car" />
      </div>
      <div className="txt-container"></div>
    </div>
  );
};
