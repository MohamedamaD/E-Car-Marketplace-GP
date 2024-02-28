import React, { useRef, useState } from "react";
import { Button, ImageUploader, Input, SectionTitle } from "../../components";
import "./MissingInformation.scss";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { UserRoles } from "../../constants";
import {
  completeInformation,
  signOut,
} from "../../store/slices/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading/Loading";
import { useHistory } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { formDataApi } from "../../services/api";
import { getToken } from "../../utils";

export const MissingInformation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, user } = useSelector((state) => state.authentication);
  const [role, setRole] = useState("seller");
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const [dataForm, setDataForm] = useState({
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      country: "",
    },
  });
  const formRef = useRef(null);
  const handleAddressChange = (field, e) => {
    setDataForm({
      ...dataForm,
      address: {
        ...dataForm.address,
        [field]: e.target.value,
      },
    });
  };
  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prev) => [...prev, ...selectedImages]);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData);
    dispatch(completeInformation(formData));

    history.push("/");
  };
  if (loading) return <Loading />;

  console.log(avatar);
  return (
    <div id="missing-information" className="layout-page">
      <form
        action=""
        name="user-form"
        id="user-form"
        encType="multipart/form-data"
        ref={formRef}
        method="post"
        onSubmit={submitHandler}
      >
        <div className="missing-information-container container">
          <main>
            <section className="rounded white-bg-color">
              <SectionTitle
                className="right"
                title="استكمال البيانات"
                subTitle="بالرجاء ملئ هذه البياانات لعدم حذف الحساب ولكي تستخدم مميزات الموقع كامله"
              />
            </section>
            <section className="rounded white-bg-color avatar-section">
              <div className="input-field">
                <label htmlFor="avatar" className="custom-label">
                  الصوره الشخصيه
                </label>
                <div className="avatar-container shadow">
                  {!avatar ? (
                    <BiPlus />
                  ) : (
                    <img src={URL.createObjectURL(avatar)} alt="avatar" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    id="avatar"
                    // required
                    onChange={(ev) => setAvatar(ev.target.files[0])}
                  />
                </div>
              </div>
            </section>
            <section className="rounded white-bg-color">
              <div className="input-field">
                <label className="custom-label">حدد هدفك</label>
                <RadioGroup
                  row
                  aria-labelledby="user-role-label"
                  name="role"
                  id="user-role"
                  value={role}
                  onChange={handleChange}
                >
                  {UserRoles.map((user) => (
                    <FormControlLabel
                      style={{ margin: 0 }}
                      value={user.role}
                      control={<Radio />}
                      label={user.value}
                      key={user.role}
                    />
                  ))}
                </RadioGroup>
              </div>
            </section>
            <section className="rounded white-bg-color common-info">
              <div className="input-field">
                <label className="custom-label" htmlFor="phone-number">
                  رقم الهاتف
                </label>
                <Input
                  id="phone-number"
                  name="phoneNumber"
                  value={dataForm.phoneNumber}
                  // required
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="wrapper">
                <div className="input-field">
                  <label className="custom-label" htmlFor="street">
                    العنوان
                  </label>
                  <Input
                    id="street"
                    value={dataForm.address.street}
                    // required
                    name="street"
                    onChange={(e) => handleAddressChange("street", e)}
                  />
                </div>
                <div className="input-field">
                  <label className="custom-label" htmlFor="city">
                    المدينه
                  </label>
                  <Input
                    id="city"
                    name="city"
                    // required
                    value={dataForm.address.city}
                    onChange={(e) => handleAddressChange("city", e)}
                  />
                </div>
                <div className="input-field">
                  <label className="custom-label" htmlFor="country">
                    المحافظه
                  </label>
                  <Input
                    id="country"
                    name="country"
                    // required
                    value={dataForm.address.country}
                    onChange={(e) => handleAddressChange("country", e)}
                  />
                </div>
              </div>
              <div className="input-field">
                <label className="custom-label">
                  برجاء رفع صور البطاقه الشخصيه أو الرخصه
                </label>
                <ImageUploader
                  handleImageUpload={handleImageUpload}
                  images={images}
                  // required
                  setImages={setImages}
                  name="license"
                />
              </div>
            </section>
          </main>
          <Button value="استكمال البيانات" type="submit" />
        </div>
      </form>
    </div>
  );
};
