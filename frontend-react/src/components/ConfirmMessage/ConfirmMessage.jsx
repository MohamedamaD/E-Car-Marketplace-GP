import React, { useState } from "react";
import "./ConfirmMessage.scss";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { deleteCar } from "../../store/slices/carsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../pages/loading/Loading";
import { isFulfilled } from "../../utils";

export const ConfirmMessage = ({ id, setVisible }) => {
  const { loading } = useSelector((state) => state.cars);

  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const confirmed = value === "تأكيد";
  if (loading) return <Loading />;
  return (
    <div className="confirm-message">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <div className="container confirm-message-container rounded white-bg-color">
        <h1>احذر</h1>
        <div className="input-field">
          <label htmlFor="confirm-message">
            بالرجاء اكتب كلمه <span className="main-color">تأكيد</span> حتي
            تتمكن من حذف السياره
          </label>
          <Input
            value={value}
            id="confirm-message"
            onChange={(ev) => setValue(ev.target.value)}
            placeholder="اكتب تأكيد ...."
          />
        </div>
        <div className="button-container">
          <Button
            value="حذف"
            className="delete-button"
            disabled={!confirmed}
            onClick={async () => {
              const response = await dispatch(deleteCar(id));
              if (isFulfilled(response)) {
                setVisible(false);
              } else {
              }
            }}
          />
          <Button
            value="الغاء"
            className="main-bg-color"
            onClick={() => setVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};
