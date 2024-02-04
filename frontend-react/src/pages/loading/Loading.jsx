import React from "react";
import "./Loading.scss";
import { images } from "../../constants";

export const Loading = () => {
  return (
    <div className="loading" id="loading-page">
      <div className="container">
        <div className="img-container">
          <img src={images.LOADING_LOADER} alt="LOADING_LOADER-IMG" />
        </div>
      </div>
    </div>
  );
};
