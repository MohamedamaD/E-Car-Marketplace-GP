import React, { useState } from "react";
import "./SellCar.scss";
import {
  Button,
  CarInformation,
  CustomCompo,
  ImageUploader,
} from "../../components";
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
import { generateCarInfo, handleImageUpload, isFulfilled } from "../../utils";

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

  const imageChangeHandler = (event) => {
    handleImageUpload(event, setImages);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = generateCarInfo(
      make,
      model,
      year,
      price,
      mileage,
      color,
      description,
      transmission,
      license,
      features,
      images
    );

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
                    <CarInformation
                      make={make}
                      setMake={setMake}
                      model={model}
                      setModel={setModel}
                      year={year}
                      setYear={setYear}
                      price={price}
                      setPrice={setPrice}
                      mileage={mileage}
                      setMileage={setMileage}
                      color={color}
                      setColor={setColor}
                      description={description}
                      setDescription={setDescription}
                      transmission={transmission}
                      setTransmission={setTransmission}
                      features={features}
                      setFeatures={setFeatures}
                      traffic={license}
                      setTraffic={setLicense}
                    ></CarInformation>

                    <div className="description">
                      <CarInformation.Description
                        description={description}
                        setDescription={setDescription}
                      />
                    </div>

                    <ImageUploader
                      handleImageUpload={imageChangeHandler}
                      images={images}
                      setImages={setImages}
                      name="car-images"
                      label="صور العربيه"
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
