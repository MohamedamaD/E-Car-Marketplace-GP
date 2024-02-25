import React, { useState } from "react";
import "./SellCar.scss";
import { Button, CustomSelect, ImageUploader } from "../../components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";

export const SellCar = () => {
  const [value, setValue] = useState("car-details");
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    trafficUnit: "",
  });
  const [images, setImages] = useState([]);

  const handleCarDetailsChange = (field, selectedValue) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [field]: selectedValue,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prev) => [...prev, ...selectedImages]);
  };

  const handleSubmit = () => {
    console.log("Car Details:", carDetails);
    console.log("Images:", images);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div id="sell-car" className="layout-page">
      <div className="overlay"></div>
      <div className="sell-car-container container">
        <main>
          <h1 className="white-color title">بيع عربيتك بأحسن سعر</h1>
          <div className="data-container">
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                bgcolor: "#fff",
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    textColor="primary"
                    orientation="horizontal"
                  >
                    <Tab label="تفاصيل السيارة" value="car-details" />
                    <Tab label="صور السيارة" value="car-images" />
                  </TabList>
                </Box>
                <TabPanel value="car-details" className="tab-panel">
                  <div className="form-container">
                    <CustomSelect
                      label="ماركة العربية"
                      id="brand-select"
                      state={carDetails.brand}
                      setState={(value) =>
                        handleCarDetailsChange("brand", value)
                      }
                      options={[]}
                    />
                    <CustomSelect
                      label="الموديل"
                      id="model-select"
                      state={carDetails.model}
                      setState={(value) =>
                        handleCarDetailsChange("model", value)
                      }
                      options={[]}
                    />
                    <TextField
                      label="السنة"
                      value={carDetails.year}
                      onChange={(e) =>
                        handleCarDetailsChange("year", e.target.value)
                      }
                    />
                    <TextField
                      label="كيلومتر"
                      value={carDetails.mileage}
                      onChange={(e) =>
                        handleCarDetailsChange("mileage", e.target.value)
                      }
                    />
                    <CustomSelect
                      label="ناقل الحركة"
                      id="transmission-select"
                      state={carDetails.transmission}
                      setState={(value) =>
                        handleCarDetailsChange("transmission", value)
                      }
                      options={[]}
                    />
                    <TextField
                      label="وحدة مرور التابعة للعربية"
                      value={carDetails.trafficUnit}
                      onChange={(e) =>
                        handleCarDetailsChange("trafficUnit", e.target.value)
                      }
                    />
                  </div>
                </TabPanel>
                <TabPanel value="car-images">
                  <ImageUploader
                    handleImageUpload={handleImageUpload}
                    images={images}
                    setImages={setImages}
                  />
                </TabPanel>
                <div className="send-container">
                  <Button
                    value="التحقق"
                    className="main-bg-color send-button"
                  />
                </div>
              </TabContext>
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};
