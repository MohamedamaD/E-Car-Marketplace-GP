import React from "react";
import "./Alert.scss";
import AlertBox from "@mui/material/Alert";

export const Alert = ({ type = "error", message = "" }) => {
  return (
    <div className="alert-container white-color">
      <AlertBox severity={type} variant="filled">
        {message}
      </AlertBox>
    </div>
  );
};
