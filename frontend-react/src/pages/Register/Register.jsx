import React, { useEffect, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Facebook, Google, Input, Linkedin } from "../../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/slices/authenticationSlice";
import { Loading } from "../loading/Loading";

export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state) => state.authentication
  );
  const [isLogin, setLogin] = useState(true);
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const submitLoginHandler = async (ev) => {
    ev.preventDefault();
    dispatch(login(dataForm));
  };

  const submitRegisterHandler = async (ev) => {
    ev.preventDefault();
    dispatch(register(dataForm));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }
    return () => {};
  }, [isAuthenticated, history]);
  if (loading) return <Loading />;
  return (
    <div id="register-page" className="layout-page">
      <div className="container register-container">
        <main>
          <div className={`login-form ${isLogin ? "active" : ""}`}>
            <TitleWithLinks
              title="تسجيل"
              subTitle="او استخدم الايميل والرقم السري"
            />
            <form action="" onSubmit={submitLoginHandler}>
              <Input
                id="email-login-field"
                name="email-login-field"
                type="email"
                required
                placeholder="ادخل الايميل"
                value={dataForm.email}
                onChange={(ev) =>
                  setDataForm({ ...dataForm, email: ev.target.value })
                }
              />
              <Input
                id="password-login-field"
                name="password-login-field"
                type="password"
                required
                value={dataForm.password}
                placeholder="ادخل الرقم السري"
                onChange={(ev) =>
                  setDataForm({ ...dataForm, password: ev.target.value })
                }
              />
              <Link to="/forget-password">نسيت كلمه السر؟</Link>
              <Button value="تسجيل" />
            </form>
          </div>
          <div className={`register-form ${!isLogin ? "active" : ""}`}>
            <TitleWithLinks
              title="انشاء ايميل"
              subTitle="او استخدم البريد الالكتروني للتسجيل"
            />
            <form action="" onSubmit={submitRegisterHandler}>
              <Input
                id="name-register-field"
                name="name-register-field"
                type="text"
                placeholder="اسمك"
                required
                value={dataForm.username}
                onChange={(ev) =>
                  setDataForm({ ...dataForm, username: ev.target.value })
                }
              />
              <Input
                id="email-register-field"
                name="email-register-field"
                type="email"
                required
                value={dataForm.email}
                placeholder="ايميلك"
                onChange={(ev) =>
                  setDataForm({ ...dataForm, email: ev.target.value })
                }
              />
              <Input
                id="password-register-field"
                name="password-register-field"
                type="password"
                required
                placeholder="رقمك السري"
                value={dataForm.password}
                onChange={(ev) =>
                  setDataForm({ ...dataForm, password: ev.target.value })
                }
              />
              <Button value="اشتراك" />
            </form>
          </div>
          <LoginToggle
            isLogin={isLogin}
            setDataForm={setDataForm}
            setLogin={setLogin}
          />
        </main>
      </div>
    </div>
  );
};

const LoginToggle = ({ isLogin, setDataForm, setLogin }) => {
  return (
    <div className={`login-toggle ${!isLogin ? "active" : ""}`}>
      <div className="_container">
        {isLogin ? <h1>اهلا بيك</h1> : <h1>عودة سعيدة</h1>}

        <p>
          {isLogin
            ? "ادخل معلوماتك الشخصيه للاستمتاع بكل مميزاتنا"
            : "ادخل البيانات التاليه للتسجيل"}
        </p>
        <Button
          value={isLogin ? " انشاء حساب" : "عندي ايميل"}
          onClick={() => {
            setLogin(!isLogin);
            setDataForm({});
          }}
        />
      </div>
    </div>
  );
};

const TitleWithLinks = ({ title = "", subTitle = "" }) => {
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      <div className="links">
        <Google />
        <Facebook />
        <Linkedin />
      </div>
      <p>{subTitle}</p>
    </div>
  );
};
