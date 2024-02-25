import React, { useState } from "react";
import { Button, ImageUploader, Input, SectionTitle } from "../../components";
import "./MissingInformation.scss";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { UserRoles } from "../../constants";
import { BiX } from "react-icons/bi";
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
  const [addressValue, setAddressValue] = useState("");
  const [images, setImages] = useState([]);
  const [showrooms, setShowrooms] = useState({
    name: "",
    count: 0,
    addresses: [],
  });
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

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await dispatch(
      completeInformation({
        ...dataForm,
        images,
        role,
      })
    );
    if (role === "showroom-owner" && res.payload?.success) {
      // TODO: handle showroom owner
    }
    dispatch(signOut());
    history.push("/register");
  };
  if (loading) return <Loading />;

  console.log(user);
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
            <section className="rounded white-bg-color other-data">
              {/* {role === "seller" && <div className="seller-info">1</div>}
          {role === "buyer" && <div className="buyer-info">2</div>} */}
              {role === "showroom-owner" && (
                <div className="showroom-owner-info">
                  <div className="input-field">
                    <label className="custom-label" htmlFor="showroom-name">
                      اسم المعرض
                    </label>
                    <Input
                      id="showroom-name"
                      value={showrooms.name}
                      onChange={(ev) =>
                        setShowrooms((prev) => ({
                          ...prev,
                          name: ev.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="input-field">
                    <label className="custom-label" htmlFor="showroom-count">
                      عدد الفروع
                    </label>
                    <Input
                      id="showroom-count"
                      type="number"
                      value={showrooms.count}
                      min={0}
                      max="10"
                      onChange={(ev) =>
                        setShowrooms((prev) => ({
                          ...prev,
                          count: ev.target.value,
                          addresses: [],
                        }))
                      }
                    />
                  </div>
                  <div className="addresses-container">
                    {showrooms.count > 0 && showrooms.count < 10 && (
                      <div className="addresses">
                        <div className="add-address-container">
                          <div className="input-field">
                            <label
                              className="custom-label"
                              htmlFor="address-name"
                            >
                              ضيف عناوين الفروع
                            </label>
                            <Input
                              id="address-name"
                              value={addressValue}
                              onChange={(ev) =>
                                setAddressValue(ev.target.value)
                              }
                            />
                          </div>
                          <Button
                            className={
                              showrooms.addresses.length >= showrooms.count
                                ? "disabled"
                                : "main-bg-color"
                            }
                            value="اضافه"
                            type="button"
                            onClick={() => {
                              if (
                                showrooms.addresses.length < showrooms.count &&
                                addressValue
                              ) {
                                setShowrooms((prev) => ({
                                  ...prev,
                                  addresses: [...prev.addresses, addressValue],
                                }));
                              }
                            }}
                          />
                        </div>
                        <div className="address-wrapper">
                          {showrooms.addresses.map((item, i) => (
                            <span
                              className="address rounded shadow"
                              key={item + i}
                              onClick={(ev) => {
                                const sr = [...showrooms.addresses];
                                sr.splice(i, 1);
                                setShowrooms((prev) => ({
                                  ...prev,
                                  addresses: [...sr],
                                }));
                              }}
                            >
                              <BiX />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {showrooms.count >= 10 && (
                      <div className="error-container">
                        <span>عدد الفروع يجب ان يكون اقل من 10</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </main>
          <Button value="استكمال البيانات" type="submit" />
        </div>
      </form>
    </div>
  );
};
