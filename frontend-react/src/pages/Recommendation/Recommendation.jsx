import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Recommendation.scss";
import { Button, CustomSelect } from "../../components";
import { CarConstants } from "../../constants";

export const Recommendation = () => {
  const [value, setValue] = useState("appearance");
  const [color, setColor] = useState("");
  const [appearance, setAppearance] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div id="recommendation-page">
      <div className="background-overlay"></div>
      <div className="recommendation-container container">
        <main className="recommendation-hero">
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
        </main>
      </div>
    </div>
  );
};

// notes from somya: user only choice between features
// v1: main features
