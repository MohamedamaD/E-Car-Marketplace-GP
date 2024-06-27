import React, { useState } from "react";
import "./ShowroomOwner.scss";
import { useSelector } from "react-redux";
import { Button, SectionTitle } from "../../components";
import {
  CreateShowroom,
  BrowseShowrooms,
} from "../../containers";
import { Link } from "react-router-dom";

export const ShowroomOwner = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
  const [option, setOption] = useState("create-showroom");

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
          <section className="rounded white-bg-color options">
            <Button
              value="اضافه معرض"
              onClick={() => setOption("create-showroom")}
            />
            <Button
              value="تصفح المعارض الخاصه"
              className="main-bg-color"
              onClick={() => setOption("browse-showrooms")}
            />
            <Link to="/my-cars">
              <Button value="تصفح عربياتي" className="delete-button" />
            </Link>
            <Link to="/sell-car">
              <Button
                value="بيع عربيه"
                className="dark-green-bg-color secondary-color"
              />
            </Link>
          </section>
          {option === "create-showroom" && <CreateShowroom />}
          {option === "browse-showrooms" && <BrowseShowrooms />}
        </main>
      </div>
    </div>
  );
};
