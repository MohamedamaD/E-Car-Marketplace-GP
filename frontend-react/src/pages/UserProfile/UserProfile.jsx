import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import { Button, Input, SectionTitle } from "../../components";
import { BiShield } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../loading/Loading";
import {
  setError,
  updateUserInfo,
} from "../../store/slices/authenticationSlice";

export const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [dataForm, setDataForm] = useState({
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
    password: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateHandler = (event) => {
    event.preventDefault();
    dispatch(updateUserInfo(dataForm));
  };

  const clickHandler = (event) => {
    if (!isEditing) {
      dispatch(setError("press edit first"));
    }
  };

  useEffect(() => {
    if (isEditing === false) {
      setDataForm({
        username: user?.username || "",
        phoneNumber: user?.phoneNumber || "",
        password: "",
      });
    }
    return () => {};
  }, [isEditing, user?.username, user?.phoneNumber]);

  if (loading) return <Loading />;
  return (
    <div id="user-profile" className="layout-page">
      <div className="container user-container">
        <main>
          <section className="title-section rounded white-bg-color">
            <div className="title-icon">
              <BiShield className="main-color" />
            </div>
            <SectionTitle
              className="right"
              title="المعلومات الشخصيه"
              subTitle="كن حريصا ف التعديل والتغير في معلوماتك والا سوف يتم حظرك"
            />
          </section>

          <section className="rounded white-bg-color content">
            <div className="form-container">
              <form action="" name="user-form" id="user-form">
                <div className="input-field">
                  <label className="custom-label" htmlFor="username">
                    الاسم
                  </label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={dataForm.username}
                    readOnly={!isEditing}
                    onChange={changeHandler}
                    onClick={clickHandler}
                    className={`${!isEditing ? "disabled" : ""}`}
                  />
                </div>
                <div className="input-field">
                  <div className="input-field">
                    <label className="custom-label" htmlFor="phoneNumber">
                      رقم الهاتف
                    </label>
                    <Input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={dataForm.phoneNumber}
                      readOnly={!isEditing}
                      onChange={changeHandler}
                      onClick={clickHandler}
                      className={`${!isEditing ? "disabled" : ""}`}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <label className="custom-label" htmlFor="email">
                    الحساب
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    readOnly
                    disabled
                    className="disabled"
                  />
                </div>
                {isEditing && (
                  <div className="input-field">
                    <label className="custom-label" htmlFor="password">
                      رقم السر
                    </label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                      readOnly={!isEditing}
                      value={dataForm.password}
                      onChange={changeHandler}
                      className={`${!isEditing ? "disabled" : ""}`}
                    />
                  </div>
                )}
                <Button
                  value={!isEditing ? "تعديل المعلومات" : "الغاء التعديل"}
                  type="button"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setEditing((prev) => !prev);
                  }}
                />
                {isEditing && (
                  <Button
                    value="تعديل"
                    type="submit"
                    className="main-bg-color send-button"
                    onClick={updateHandler}
                  />
                )}
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// TODO : in next release we should to handle error messages globally
