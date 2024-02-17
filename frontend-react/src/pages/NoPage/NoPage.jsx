import React, { useEffect } from "react";
import "./NoPage.scss";
import { images } from "../../constants";
import { Link } from "react-router-dom";

export const NoPage = () => {
  useEffect(() => {
    window.scrollTo({ top: "80", behavior: "smooth" });
  }, []);
  return (
    <div id="no-page">
      <div className="container __no-container">
        <div>
          <h1>هذه الصفحه المطلوبه ليست موجوده</h1>
          <Link to="/" className="main-color">
            بالرجاء الرجوع للصفحه الرئيسيه
          </Link>
        </div>
        <div>
          <img src={images.NOTFOUND_1} alt="" />
        </div>
      </div>
    </div>
  );
};
