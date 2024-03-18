import React, { useState } from "react";
import { Button, ImageUploader, Input } from "../../components";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";

import "./CreateShowroom.scss";
import { isFulfilled } from "../../utils";
import { createShowroom } from "../../store/slices/showroomOwnerSlice";
import { useHistory } from "react-router-dom";
export const CreateShowroom = () => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locations, setLocations] = useState([]);
  const limit = 10;
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    locations.forEach((location, index) => {
      formData.append(`locations[${index}][address]`, location.address);
      formData.append(`locations[${index}][phone]`, location.phone);
      formData.append(`locations[${index}][name]`, location.name);
    });
    formData.append("image", image[0]);
    console.log(image);
    const response = await dispatch(createShowroom(formData));
    if (isFulfilled(response)) {
      history.go(0);
    }
  };
  return (
    <section className="rounded white-bg-color create-showroom">
      <form encType="multipart/form-data" onSubmit={submitHandler}>
        <div className="showroom-owner-info">
          <div className="input-field">
            <label className="custom-label" id="image" htmlFor="image">
              صوره المعرض
            </label>
            <ImageUploader
              images={image}
              setImages={setImage}
              name="image"
              handleImageUpload={(event) => {
                const selectedImages = Array.from(event.target.files);
                setImage(selectedImages);
              }}
            />
          </div>
          <div className="input-field">
            <label className="custom-label" htmlFor="showroom-name">
              اسم المعرض
            </label>
            <Input
              id="showroom-name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="input-field">
            <label className="custom-label" htmlFor="showroom-description">
              وصف
            </label>
            <Input
              id="showroom-description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
          <div className="input-field">
            <label className="custom-label" htmlFor="showroom-count">
              عدد الفروع
            </label>
            <Input
              id="showroom-count"
              type="number"
              value={count}
              min={0}
              max={limit}
              onChange={(ev) => {
                setCount(ev.target.value);
                setLocations([]);
              }}
            />
          </div>
          <div className="addresses-container">
            {count > 0 && count < limit && (
              <div className="addresses">
                <div className="add-address-container">
                  <div className="input-field">
                    <label className="custom-label" htmlFor="address-name">
                      ضيف عناوين الفروع
                    </label>
                    <Input
                      id="address-name"
                      value={locationName}
                      onChange={(ev) => setLocationName(ev.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label className="custom-label" htmlFor="address-phone">
                      رقم هاتف الفرع
                    </label>
                    <Input
                      id="address-phone"
                      value={locationNumber}
                      type="tel"
                      pattern="\d{11}"
                      onChange={(ev) => setLocationNumber(ev.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label className="custom-label" htmlFor="address">
                      العنوان بالتفاصيل
                    </label>
                    <Input
                      id="address"
                      value={locationAddress}
                      onChange={(ev) => setLocationAddress(ev.target.value)}
                    />
                  </div>
                  <Button
                    className={
                      locations.length >= count ? "disabled" : "main-bg-color"
                    }
                    value="اضافه"
                    type="button"
                    onClick={() => {
                      if (locations.length < count) {
                        if (locationName && locationNumber.length === 11) {
                          setLocations((prev) => [
                            ...prev,
                            {
                              name: locationName,
                              phone: locationNumber,
                              address: locationAddress,
                            },
                          ]);
                          setError("");
                        } else {
                          setError(
                            "بالرجاء ادخال رقم الهاتف مكون من 11 رقم واسم صحيح"
                          );
                        }
                      }
                    }}
                  />
                  {locations.length >= count && <Button value="حفظ المعرض" />}
                </div>
                {error && <p className="error">{error}</p>}
                <div className="address-wrapper">
                  {locations.map((item, i) => (
                    <span
                      className="address rounded shadow"
                      key={item + i}
                      onClick={(ev) => {
                        const sr = [...locations];
                        sr.splice(i, 1);
                        setLocations(sr);
                      }}
                    >
                      <BiX />
                      <span className="name">الاسم : {item.name}</span>
                      <span className="phone">رقم الهاتف : {item.phone}</span>
                      <span className="phone">
                        العنوان بالتفاصيل : {item.address}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {count >= limit && (
              <div className="error-container">
                <p className="error">عدد الفروع يجب ان يكون اقل من 10</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
