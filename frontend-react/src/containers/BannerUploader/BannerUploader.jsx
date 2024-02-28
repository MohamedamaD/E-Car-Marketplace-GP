import React, { useRef, useState } from "react";
import "./BannerUploader.scss";
import { Button, ImageUploader, SectionTitle } from "../../components";
import { useDispatch } from "react-redux";
import { createBanner } from "../../store/slices/mediaSlice";
import { setError, setSuccess } from "../../store/slices/authenticationSlice";
export const BannerUploader = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile([e.target.files[0]]);
  };

  const handleUpload = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(formRef.current);
    const res = await dispatch(createBanner(formData));
    if (res.payload.success) {
      setSelectedFile([]);
      dispatch(setSuccess("upload banner successfully"));
    } else {
      dispatch(setError("Rejected"));
    }
  };
  return (
    <div className="banner-uploader">
      <SectionTitle
        title="صاحب معرض؟"
        subTitle="ضيف اعلانك بكل سهوله كل الي عليك ضيف التصميم الي يعجبك"
      />
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleUpload}
        ref={formRef}
      >
        <ImageUploader
          images={selectedFile}
          handleImageUpload={handleFileChange}
          setImages={setSelectedFile}
          name="banner"
        />
        <Button value="رفع" />
      </form>
    </div>
  );
};
