import React from "react";
import "./Alert.scss";
import AlertBox from "@mui/material/Alert";

export const Alert = ({
  type = "error",
  message = "",
  dir = "rtl",
  lang = "ar",
}) => {
  return (
    <div className="alert-container white-color" lang={lang} dir={dir}>
      <AlertBox severity={type} variant="filled">
        {message}
      </AlertBox>
    </div>
  );
};
