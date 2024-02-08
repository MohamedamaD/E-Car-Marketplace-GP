import React from "react";
import "./Banner.scss";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { images } from "../../constants";

export const Banner = () => {
  return (
    <div className="sell-banner">
      <div className="container">
        <div className="sell">
          <h1>بيع عربيتك</h1>
          <h3> فحص مجاني للعربية، عرض ودفع فوري، بدون أى مصاريف </h3>
          <Link to="/sell-car">
            <Button
              value="بيع عربيتك"
              className="secondary-bg-color sell-button"
            />
          </Link>
        </div>

        <Link to="/sell-car" className="link-item">
          <Button
            value="بيع عربيتك"
          />
        </Link>

        <div className="floating-img">
          <img src={images.CAR_3} alt="car-3" />
        </div>

        <div className="img-container">
          <img src={images.CAR_1} alt="car-1" />
        </div>
      </div>
    </div>
  );
};
