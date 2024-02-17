import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Facebook, Google, Input, Linkedin } from "../../components";

export const Register = () => {
  const [isLogin, setLogin] = useState(true);
  const [dataForm, setDataForm] = useState({
    name: "",
    password: "",
    email: "",
  });
  const submitLoginHandler = (ev) => {
    ev.preventDefault();
  };
  const submitRegisterHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <div id="register-page">
      <div className="container register-container">
        <main>
          <div className={isLogin ? "login-form active" : "login-form"}>
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
          <div className={isLogin ? "register-form" : "register-form active"}>
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
                  setDataForm({ ...dataForm, name: ev.target.value })
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

          <div className={isLogin ? "login-toggle" : "login-toggle active"}>
            <div className="_container">
              {isLogin ? <h1>اهلا بيك</h1> : <h1>عودة سعيدة</h1>}

              {isLogin ? (
                <p>ادخل معلوماتك الشخصيه للاستمتاع بكل مميزاتنا</p>
              ) : (
                <p>ادخل البيانات التاليه للتسجيل</p>
              )}
              {isLogin ? (
                <Button
                  value=" انشاء حساب"
                  onClick={() => {
                    setLogin(false);
                    setDataForm({});
                  }}
                />
              ) : (
                <Button
                  value="عندي ايميل"
                  onClick={() => {
                    setLogin(true);
                    setDataForm({});
                  }}
                />
              )}
            </div>
          </div>
        </main>
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
        {/* <Facebook /> */}
        <Linkedin />
      </div>
      <p>{subTitle}</p>
    </div>
  );
};
