import React, { useState } from "react";
import "./SellCar.scss";
import { Button, CustomCompo, ImageUploader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";

import { sellCar } from "../../store/slices/carsSlice";
import { CarConstants } from "../../constants";
import { useHistory } from "react-router-dom";
import { Brands, Models, Transmission } from "../../constants/CarConstants";
import { Loading } from "../loading/Loading";
import { setError, setSuccess } from "../../store/slices/authenticationSlice";
import { isFulfilled } from "../../utils";

export const SellCar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cars);
  // car schema
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [transmission, setTransmission] = useState("");
  const [features, setFeatures] = useState([]);
  const [license, setLicense] = useState("");
  const [images, setImages] = useState([]);

  const [value, setValue] = useState("car-details");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prev) => [...prev, ...selectedImages]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("mileage", mileage);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("transmission", transmission);
    formData.append("license", license);
    features.forEach((feature) => formData.append("features", feature));
    images.forEach((image) => formData.append("car-images", image));

    const response = await dispatch(sellCar(formData));
    if (isFulfilled(response)) {
      history.push("/my-cars");
    } else {
      history.go(0);
    }
  };

  if (loading) return <Loading />;
  return (
    <div id="sell-car" className="layout-page">
      <div className="overlay"></div>
      <div className="sell-car-container container">
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
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
                      <Tab label="مميزات اضافيه" value="features" />
                    </TabList>
                  </Box>
                  <TabPanel value="car-details" className="tab-panel">
                    <div className="form-container">
                      <CustomCompo
                        label="ماركة العربية"
                        id="brand-select"
                        name="make"
                        required
                        value={make}
                        setValue={setMake}
                        options={Brands}
                      />
                      <CustomCompo
                        label="الموديل"
                        id="model-select"
                        name="model"
                        required
                        value={model}
                        setValue={setModel}
                        options={Models}
                      />
                      <CustomCompo
                        id="transmission-select"
                        label="ناقل الحركة"
                        required
                        options={Transmission}
                        name="transmission"
                        value={transmission}
                        setValue={setTransmission}
                      />
                      <TextField
                        label="السنة"
                        value={year}
                        required
                        name="year"
                        onChange={(e) => setYear(e.target.value)}
                      />
                      <TextField
                        label="اللون"
                        value={color}
                        required
                        name="color"
                        onChange={(e) => setColor(e.target.value)}
                      />
                      <TextField
                        label="كيلومتر"
                        value={mileage}
                        required
                        name="mileage"
                        onChange={(e) => setMileage(e.target.value)}
                      />
                      <TextField
                        label="السعر"
                        value={price}
                        required
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <TextField
                        label="وحدة مرور التابعة للعربية"
                        value={license}
                        required
                        name="license"
                        onChange={(e) => setLicense(e.target.value)}
                      />
                    </div>
                    <div className="input-field description">
                      <label htmlFor="description" className="custom-label">
                        وصف
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="custom-textarea"
                      ></textarea>
                    </div>
                    <ImageUploader
                      handleImageUpload={handleImageUpload}
                      images={images}
                      setImages={setImages}
                      name="car-images"
                    />
                  </TabPanel>
                  <TabPanel value="features">
                    <CustomCompo
                      id="car-features"
                      label="مميزات"
                      name="features"
                      multiple
                      value={features}
                      setValue={setFeatures}
                      options={CarConstants.features}
                    />
                  </TabPanel>
                  <div className="send-container">
                    <Button
                      value="التحقق"
                      type="submit"
                      className="main-bg-color send-button"
                      // onClick={handleSubmit}
                    />
                  </div>
                </TabContext>
              </Box>
            </div>
          </main>
        </form>
      </div>
    </div>
  );
};
