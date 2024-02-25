import React, { useEffect } from "react";
import "./Alert.scss";
import AlertBox from "@mui/material/Alert";

export const Alert = ({
  type = "error",
  message = "",
  dir = "rtl",
  lang = "ar",
  index,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="alert-container white-color" lang={lang} dir={dir}>
      <AlertBox
        severity={type}
        variant="filled"
        style={{ alignItems: "center" }}
      >
        <span className="message-value">{message}</span>
      </AlertBox>
    </div>
  );
};
