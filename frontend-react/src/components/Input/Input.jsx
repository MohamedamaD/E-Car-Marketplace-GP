import React from "react";
import "./Input.scss";
export const Input = ({
  className = "",
  value = "",
  name = "",
  id = "",
  type = "text",
  placeholder = "",
  onChange = () => {},
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`custom-input ${className}`}
      onChange={onChange}
    />
  );
};
