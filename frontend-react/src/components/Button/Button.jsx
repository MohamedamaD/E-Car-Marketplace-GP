import React from "react";
import "./Button.scss";

export const Button = ({
  onClick = () => {},
  className = "secondary-bg-color",
  value = "",
  children,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded white-color custom-btn ${className}`}
      {...rest}
    >
      {children}
      {value}
    </button>
  );
};
