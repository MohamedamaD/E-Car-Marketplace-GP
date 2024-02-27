import React, { useState } from "react";
import "./ConfirmMessage.scss";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { deleteCar } from "../../store/slices/dataSlice";
import { useDispatch } from "react-redux";

export const ConfirmMessage = ({ id, setVisible }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const confirmed = value === "تأكيد";
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
              const res = await dispatch(deleteCar(id));
              if (!res.error) {
                setVisible(false);
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
