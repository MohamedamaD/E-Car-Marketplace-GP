import React, { useState } from "react";
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

export const MissingInformation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, user } = useSelector((state) => state.authentication);
  const [role, setRole] = useState("seller");
  const [images, setImages] = useState([]);

  const [dataForm, setDataForm] = useState({
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      country: "",
    },
  });
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

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      completeInformation({
        ...dataForm,
        images,
        role,
      })
    );

    dispatch(signOut());
    history.push("/register");
  };
  if (loading) return <Loading />;

  console.log(role);
  return (
    <div id="missing-information" className="layout-page">
      <form
        action=""
        name="user-form"
        id="user-form"
        encType="multipart/form-data"
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
            <section className="rounded white-bg-color">
              <div className="input-field">
                <label className="custom-label">حدد هدفك</label>
                <RadioGroup
                  row
                  aria-labelledby="user-role-label"
                  name="user-role"
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
                  type="phone"
                  value={dataForm.phoneNumber}
                  required
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
                    required
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
                    required
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
                    required
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
                  required
                  setImages={setImages}
                  name="images"
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
