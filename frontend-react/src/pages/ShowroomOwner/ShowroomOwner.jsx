import React from "react";
import "./ShowroomOwner.scss";
import { useSelector } from "react-redux";
import { SectionTitle } from "../../components";

export const ShowroomOwner = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
  return (
    <div className="layout-page" id="showroom-owner-page">
      <div className="showroom-owner-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="معارضي"
              subTitle="عدل علي محتوي المعارض التابعه لك "
              className="right"
            />
          </section>
          <section className="rounded white-bg-color"></section>
        </main>
      </div>
    </div>
  );
};
