import React, { useState } from "react";
import "./Contact.scss";
import { Button, Input, SectionTitle } from "../../components";

export const Contact = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    message: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (ev) => {};
  return (
    <div id="contact-page" className="layout-page">
      <div className="contact-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="تواصل معنا"
              className="right"
              subTitle="تقدر تتواصل في اي وقت"
            />
          </section>
          <section className="rounded white-bg-color form-container">
            <form
              action=""
              onSubmit={submitHandler}
              id="contact-form"
              name="contact-form"
            >
              <div className="input-field">
                <label className="custom-label" htmlFor="username">
                  اسمك
                </label>
                <Input
                  type="text"
                  id="username"
                  required
                  name="username"
                  value={dataForm.username}
                  placeholder="اسمك.."
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <label className="custom-label" htmlFor="email">
                  البريد الالكتروني
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={dataForm.email}
                  required
                  placeholder="ايميلك.."
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <label className="custom-label" htmlFor="message">
                  رسالتك...
                </label>
                <textarea
                  id="message"
                  name="message"
                  maxLength="3000"
                  required
                  placeholder="رسالتك.."
                  className="custom-textarea"
                  onChange={changeHandler}
                  value={dataForm.message}
                ></textarea>
              </div>

              <Button value="ارسال" />
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};
