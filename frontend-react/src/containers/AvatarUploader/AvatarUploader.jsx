import React, { useState } from "react";
import "./AvatarUploader.scss";
import { Button } from "../../components";
import { useDispatch } from "react-redux";
import { isFulfilled } from "../../utils";
import { changeAvatar } from "../../store/slices/authenticationSlice";
import { useHistory } from "react-router-dom";

export const AvatarUploader = ({ isOpen }) => {
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await dispatch(changeAvatar(formData));

    if (isFulfilled(response)) {
      isOpen(false);
      history.go(0);
    } else {
    }
  };
  return (
    <form
      action=""
      className="avatar-uploader-form"
      onDoubleClick={() => isOpen(false)}
      onSubmit={submitHandler}
      encType="multipart form-data"
    >
      <div className="form-container container shadow rounded white-bg-color">
        {avatar && (
          <div className="input-field">
            <label htmlFor="avatar" className="custom-label">
              الصوره الشخصيه
            </label>
            <div className="avatar-container shadow">
              <img src={URL.createObjectURL(avatar)} alt="avatar" />
            </div>
          </div>
        )}

        <div className="buttons-container">
          <Button className="main-bg-color upload-button" value="تحميل الصوره">
            <input
              type="file"
              accept="image/*"
              name="avatar"
              id="avatar"
              required
              onChange={(ev) => setAvatar(ev.target.files[0])}
            />
          </Button>
          <Button value="تاكيد" type="submit" />
          <Button
            className="delete-button"
            onClick={() => isOpen(false)}
            value="الغاء"
          />
        </div>
      </div>
    </form>
  );
};
