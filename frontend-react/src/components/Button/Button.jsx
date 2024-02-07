import React from "react";
import "./Button.scss";

export const Button = ({
  onClick = () => {},
  className = "secondary-bg-color",
  value = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded white-color custom-btn ${className}`}
    >
      {value}
    </button>
  );
};