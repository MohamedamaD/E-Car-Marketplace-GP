import React from "react";
import "./SectionTitle.scss";

export const SectionTitle = ({ title = "", subTitle = "" }) => {
  return (
    <div className="section-title">
      <div className="container section-container">
        <h2 className="main-color title">{title}</h2>
        <p className="p-color subtitle">{subTitle}</p>
      </div>
    </div>
  );
};
