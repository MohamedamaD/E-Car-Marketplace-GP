import React from "react";
import "./CarDetails.scss";
import { useParams } from "react-router-dom";

export const CarDetails = () => {
  const { id } = useParams();
  return (
    <div id="car-details">
      <div className="container car-details-container">{id}</div>
    </div>
  );
};
