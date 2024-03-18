import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Recommendation.scss";
import { Button, CustomSelect, ImageUploader } from "../../components";
import { CarConstants } from "../../constants";
import {
  BiArrowBack,
  BiImage,
  BiInfoCircle,
  BiLeftArrow,
  BiMoney,
} from "react-icons/bi";

export const Recommendation = () => {
  const [option, setOption] = useState();
  const [carImages, setCarImages] = useState([]);
  const [value, setValue] = useState("appearance");
  const [color, setColor] = useState("");
  const [appearance, setAppearance] = useState("");

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setCarImages((prev) => [...prev, ...selectedImages]);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div id="recommendation-page" className="layout-page">
      <div className="background-overlay"></div>

      <div className="recommendation-container container">
        <main className="rounded white-bg-color">
          {!option && (
            <section className="options-wrapper">
              <p className="main-color">اختار طريقة البحث</p>
              <div className="box">
                <div className="using-image box-item">
                  <div
                    className="icon-container"
                    onClick={() => setOption("using-image")}
                  >
                    <BiImage />
                  </div>
                  <span>بالصور</span>
                </div>
                <div className="using-info box-item">
                  <div
                    className="icon-container"
                    onClick={() => setOption("using-info")}
                  >
                    <BiMoney />
                  </div>
                  <span>بالسعر والمعلومات</span>
                </div>
              </div>
            </section>
          )}
          {option && (
            <section className="option-wrapper">
              <div className="prev-container">
                <span>رجوع</span>
                <div className="icon-container" onClick={() => setOption("")}>
                  <BiArrowBack />
                </div>
              </div>
              {option === "using-image" && (
                <div className="image-sender">
                  <ImageUploader
                    name=""
                    setImages={setCarImages}
                    handleImageUpload={handleImageUpload}
                    images={carImages}
                  />
                  {carImages.length !== 0 && (
                    <Button className="send-image main-bg-color" value="توقع" />
                  )}
                </div>
              )}
              {option === "using-info" && <div className="info-sender"></div>}
            </section>
          )}
        </main>

        {/* <main className="recommendation-hero">
          <h1 className="white-color title">اعثر علي عربية احلامك</h1>
          <div className="user-data white-bg-color">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    textColor="primary"
                    orientation="horizontal"
                  >
                    <Tab label="المظهر" value="appearance" />
                    <Tab label="الاداء" value="performance" />
                    <Tab label="المزيد" value="more" />
                  </TabList>
                </Box>
                <TabPanel value="appearance" className="tab-panel">
                  <div className="color-container">
                    <span
                      className="circle-color shadow"
                      style={{ backgroundColor: color }}
                    ></span>
                    <CustomSelect
                      label="اللون"
                      id="color-select"
                      state={color}
                      setState={setColor}
                      options={CarConstants.colors}
                    />
                  </div>
                  <div className="car-appearance-container">
                    <CustomSelect
                      label="مظهر العربيه"
                      id="appearance-select"
                      state={appearance}
                      setState={setAppearance}
                      options={CarConstants.bodyStyle}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="performance">Item Two</TabPanel>
                <TabPanel value="more"></TabPanel>
                <div className="button-container">
                  <Button value="بحث" className="main-bg-color search-button" />
                </div>
              </TabContext>
            </Box>
            <form action=""></form>
          </div>
        </main> */}
      </div>
    </div>
  );
};

// notes from somya: user only choice between features
// v1: main features
