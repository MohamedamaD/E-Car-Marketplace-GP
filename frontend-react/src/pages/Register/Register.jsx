import React, { useEffect, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Facebook,
  Google,
  Input,
  Linkedin,
} from "../../components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  resetError,
} from "../../store/slices/authenticationSlice";
import { Loading } from "../loading/Loading";

export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, loading, error, isAuthenticated } = useSelector(
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
    const Timeout = setTimeout(() => {
      dispatch(resetError());
    }, 5000);
    return () => {
      clearTimeout(Timeout);
    };
  }, [error]);
  useEffect(() => {
    if (isAuthenticated) {
      history.goBack();
    }
    return () => {};
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div id="register-page">
      <div className="container register-container">
        {error && <Alert message={error} type="error" lang="en" dir="ltr" />}

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
                placeholder="ادخل الايميل"
                onChange={(ev) =>
                  setDataForm({ ...dataForm, email: ev.target.value })
                }
              />
              <Input
                id="password-login-field"
                name="password-login-field"
                type="password"
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
                onChange={(ev) =>
                  setDataForm({ ...dataForm, username: ev.target.value })
                }
              />
              <Input
                id="email-register-field"
                name="email-register-field"
                type="email"
                placeholder="ايميلك"
                onChange={(ev) =>
                  setDataForm({ ...dataForm, email: ev.target.value })
                }
              />
              <Input
                id="password-register-field"
                name="password-register-field"
                type="password"
                placeholder="رقمك السري"
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
