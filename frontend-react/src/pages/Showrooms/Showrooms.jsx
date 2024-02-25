import React from "react";
import "./Showrooms.scss";
import { useSelector } from "react-redux";
import { SectionTitle } from "../../components";
export const Showrooms = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
  return (
    <div className="layout-page" id="showrooms-page">
      <div className="showrooms-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="أفضل المعارض"
              subTitle="تصفح المعارض واختار عربيتك علي مزاجك"
              className="right"
            />
          </section>
          <section className="rounded white-bg-color"></section>
        </main>
      </div>
    </div>
  );
};
