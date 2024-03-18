import React from "react";
import "./AddShowroom.scss";
import { CreateShowroom } from "../../containers";
import { SectionTitle } from "../../components";
export const AddShowroom = () => {
  return (
    <div className="layout-page" id="add-showroom-page">
      <div className="add-showroom-container container">
        <main>
          <section className="white-bg-color rounded">
            <SectionTitle
              title="ضيف فرعك"
              subTitle="ادخل البيانات كامله ومتنساش الصور"
              className="right"
            />
          </section>
          <CreateShowroom />
        </main>
      </div>
    </div>
  );
};
