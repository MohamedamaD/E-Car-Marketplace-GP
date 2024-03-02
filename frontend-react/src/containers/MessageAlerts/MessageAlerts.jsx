import React from "react";
import "./MessageAlerts.scss";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { checkError, checkSuccess } from "../../utils";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { closeMessage } from "../../store/slices/messageSlice";

export const MessageAlerts = () => {
  const { message, type, open } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const checkedMessage =
    type === "success" ? checkSuccess(message) : checkError(message);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeMessage());
  };

  return (
    <div>
      <Snackbar
        open={open}
        className="message-container"
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%", minWidth: "200px" }}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            color: "white",
          }}
          lang="ar"
          dir="rtl"
        >
          {checkedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
