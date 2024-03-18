import React, { Fragment } from "react";
import { CustomCompo } from "../CustomCompo/CustomCompo";
import TextField from "@mui/material/TextField";
import {
  Brands,
  Models,
  Transmission,
  Features,
  Colors,
  Years,
  TrafficDepartments,
} from "../../constants/CarConstants";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const CarInformation = (props) => {
  const { children } = props;
  return (
    <div className="car-information">
      {children}
      <CarInformation.Makes {...props} />
      <CarInformation.Models {...props} />
      <CarInformation.Transmissions {...props} />
      <CarInformation.Year {...props} />
      <CarInformation.Colors {...props} />
      <CarInformation.Mileage {...props} />
      <CarInformation.Price {...props} />
      <CarInformation.TrafficDepartments {...props} />
    </div>
  );
};

CarInformation.Makes = (props) => {
  const { make, setMake } = props;

  return (
    <CustomCompo
      label="ماركة العربية"
      id="brand-select"
      name="make"
      required
      value={make}
      setValue={setMake}
      options={Brands}
    />
  );
};

CarInformation.Models = (props) => {
  const { model, setModel } = props;

  return (
    <CustomCompo
      label="الموديل"
      id="model-select"
      name="model"
      required
      value={model}
      setValue={setModel}
      options={Models}
    />
  );
};

CarInformation.Transmissions = (props) => {
  const { transmission, setTransmission } = props;

  return (
    <CustomCompo
      id="transmission-select"
      label="ناقل الحركة"
      required
      name="transmission"
      value={transmission}
      setValue={setTransmission}
      options={Transmission}
    />
  );
};

CarInformation.Features = (props) => {
  const { features, setFeatures } = props;

  return (
    <CustomCompo
      id="car-features"
      label="مميزات"
      name="features"
      multiple
      value={features}
      setValue={setFeatures}
      options={Features}
    />
  );
};

CarInformation.Colors = (props) => {
  const { color, setColor } = props;

  return (
    <CustomCompo
      id="car-color"
      label="اللون"
      name="color"
      value={color}
      setValue={setColor}
      options={Colors}
    />
  );
};

CarInformation.Year = (props) => {
  const { year, setYear } = props;

  return (
    <CustomCompo
      id="car-year"
      label="السنه"
      name="year"
      required
      value={year}
      setValue={setYear}
      options={Years}
    />
  );
};

CarInformation.TrafficDepartments = (props) => {
  const { traffic, setTraffic } = props;

  return (
    <CustomCompo
      id="car-traffic"
      label="مركز الترخيص"
      name="traffic"
      required
      value={traffic}
      setValue={setTraffic}
      options={TrafficDepartments}
    />
  );
};

CarInformation.Mileage = (props) => {
  const { mileage, setMileage } = props;

  return (
    <TextField
      label="كيلومتر"
      value={mileage}
      required
      name="mileage"
      onChange={(e) => setMileage(e.target.value)}
    />
  );
};

CarInformation.Price = (props) => {
  const { price, setPrice } = props;

  return (
    <TextField
      label="السعر"
      value={price}
      required
      name="price"
      onChange={(e) => setPrice(e.target.value)}
    />
  );
};

CarInformation.Description = (props) => {
  const { description, setDescription } = props;

  return (
    <div>
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
  );
};

CarInformation.Showrooms = (props) => {
  const { showroomID, setShowroomID, showrooms } = props;

  const handleShowroomChange = (event) => {
    setShowroomID(event.target.value);
  };
  console.log(showrooms);
  return (
    <Select
      value={showroomID}
      onChange={handleShowroomChange}
      fullWidth
      label="Showrooms"
      required
    >
      {showrooms.map((showroom) => (
        <MenuItem key={showroom._id} value={showroom._id}>
          {showroom.name}
        </MenuItem>
      ))}
    </Select>
  );
};
