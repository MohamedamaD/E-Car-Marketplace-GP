import React from "react";
import { SectionTitle } from "../../components";
import { BrowseShowrooms } from "../../containers";

export const EditShowrooms = () => {
  return (
    <div className="layout-page" id="edit-showrooms-page">
      <div className="edit-showrooms-container container">
        <main>
          <section className="white-bg-color rounded">
            <SectionTitle
              title="تعديل المعارض"
              subTitle="اختار المعرض وعدل عليه"
              className="right"
            />
          </section>
          <BrowseShowrooms />
        </main>
      </div>
    </div>
  );
};
