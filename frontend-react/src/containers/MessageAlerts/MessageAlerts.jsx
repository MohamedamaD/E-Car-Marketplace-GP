import React, { useEffect } from "react";
import "./MessageAlerts.scss";
import { Alert } from "../../components";
import { useSelector } from "react-redux";
import { checkError, checkSuccess } from "../../utils";
import {
  resetError,
  resetSuccess,
} from "../../store/slices/authenticationSlice";
import { useDispatch } from "react-redux";
export const MessageAlerts = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.authentication);
  const checkedErrorMessage = checkError(error);
  const checkedSuccessMessage = checkSuccess(success);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(resetError());
      dispatch(resetSuccess());
    }, 4000);
    return () => {
      clearTimeout(id);
    };
  }, [dispatch, error, success]);
  return (
    <div className="message-alerts">
      <div className="container message-alerts-container">
        {error && <Alert message={checkedErrorMessage} />}
        {success && <Alert message={checkedSuccessMessage} type="success" />}
      </div>
    </div>
  );
};
