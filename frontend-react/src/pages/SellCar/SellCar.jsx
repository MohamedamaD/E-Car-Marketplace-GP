import React, { useState } from "react";
import "./SellCar.scss";
import { Button, CustomSelect, ImageUploader } from "../../components";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import { sellCar } from "../../store/slices/carsSlice";
import { CarConstants } from "../../constants";
import { setError, setSuccess } from "../../store/slices/authenticationSlice";
import { useHistory } from "react-router-dom";

export const SellCar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("car-details");
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    transmission: "",
    license: "",
    price: "",
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

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(carDetails).forEach((key) => {
      formData.append(key, carDetails[key]);
    });
    console.log(formData.get("model"));
    // const res = await dispatch(sellCar({ ...carDetails }));
    // if (res.meta?.requestStatus === "fulfilled") {
    //   dispatch(setSuccess("car is successfully sell"));
    //   history.push("/my-cars");
    // } else {
    //   console.log(res);
    //   dispatch(setError("missing data"));
    // }
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
                      state={carDetails.make}
                      setState={(value) =>
                        handleCarDetailsChange("make", value)
                      }
                      options={CarConstants.brands}
                    />
                    <CustomSelect
                      label="الموديل"
                      id="model-select"
                      state={carDetails.model}
                      setState={(value) =>
                        handleCarDetailsChange("model", value)
                      }
                      options={CarConstants.models}
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
                    <TextField
                      label="السعر"
                      value={carDetails.price}
                      onChange={(e) =>
                        handleCarDetailsChange("price", e.target.value)
                      }
                    />
                    <CustomSelect
                      label="ناقل الحركة"
                      id="transmission-select"
                      state={carDetails.transmission}
                      setState={(value) =>
                        handleCarDetailsChange("transmission", value)
                      }
                      options={CarConstants.transmissionTypes}
                    />
                    <TextField
                      label="وحدة مرور التابعة للعربية"
                      value={carDetails.license}
                      onChange={(e) =>
                        handleCarDetailsChange("license", e.target.value)
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
                    type="submit"
                    className="main-bg-color send-button"
                    onClick={handleSubmit}
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
