import React from "react";
import "./SectionTitle.scss";

export const SectionTitle = ({
  title = "",
  subTitle = "",
  className = "",
  children,
}) => {
  return (
    <div className={`section-title ${className}`}>
      <div className="section-container">
        <div>
          <h2 className="main-color title">{title}</h2>
          <p className="p-color subtitle">{subTitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
