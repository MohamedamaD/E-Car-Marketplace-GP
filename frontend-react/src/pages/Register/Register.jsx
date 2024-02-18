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
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authenticationSlice";

export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataForm),
  };
  const submitLoginHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/user/login", options);
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };
  const submitRegisterHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/user/register", options);
      if (res.status === 201) {
        dispatch(setUser(dataForm));
        history.push("/");
      } else if (res.status === 409) {
        const { message } = await res.json();
        setError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const Timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => {
      clearTimeout(Timeout);
    };
  }, [error]);
  return (
    <div id="register-page">
      <div className="container register-container">
        {error && <Alert message={error} type="error" />}

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
