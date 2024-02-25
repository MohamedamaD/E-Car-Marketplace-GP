import React, { useState } from "react";
import "./BannerUploader.scss";
import { Button, ImageUploader, SectionTitle } from "../../components";
import api from "../../services/api";
export const BannerUploader = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({
    success: null,
    filePath: null,
  });

  const handleFileChange = (e) => {
    setSelectedFile([e.target.files[0]]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("banner", selectedFile);
    //dispatch banner ...    
  };
  return (
    <div className="banner-uploader">
      <SectionTitle
        className="right"
        title="صاحب معرض؟"
        subTitle="ضيف اعلانك بكل سهوله كل الي عليك ضيف التصميم الي يعجبك"
      />
      <ImageUploader
        images={selectedFile}
        handleImageUpload={handleFileChange}
        setImages={selectedFile}
      />
      <Button onClick={handleUpload} value="رفع" />
    </div>
  );
};
