import React, { useState } from "react";
import "./ImageUploader.scss";
import { BiUpload, BiX } from "react-icons/bi";
import { Button } from "../Button/Button";

export const ImageUploader = ({
  handleImageUpload,
  images,
  setImages,
  name = "",
  label,
}) => {
  const [targetImg, setTargetImg] = useState("");
  return (
    <div className="image-upload-container">
      {label && <p className="label">{label}</p>}
      <div className="upload-input shadow">
        <input
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleImageUpload}
          name={name}
          id="image-upload-input"
        />
        <BiUpload className="main-color" />
      </div>
      {images?.length > 0 && (
        <div className="images">
          {images.map((image, i) => (
            <img
              src={URL.createObjectURL(image)}
              alt={`Car ${i + 1}`}
              key={i}
              onClick={() => setTargetImg(image)}
              className="rounded"
            />
          ))}
        </div>
      )}
      {targetImg && (
        <div className="image-viewer">
          <div className="overlay" onClick={() => setTargetImg("")}></div>
          <div className="wrapper-container container">
            <div className="wrapper">
              <div
                className="icon-container close"
                onClick={() => setTargetImg("")}
              >
                <BiX />
              </div>
              <Button
                value="مسح"
                className="main-bg-color"
                onClick={() => {
                  const newImage = images.filter((img) => img !== targetImg);
                  setImages([...newImage]);
                  setTargetImg("");
                }}
              />
            </div>
            <div className="img-container">
              <img src={URL.createObjectURL(targetImg)} alt="target" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
