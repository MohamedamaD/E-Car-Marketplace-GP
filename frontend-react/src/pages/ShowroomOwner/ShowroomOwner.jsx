import React, { useState } from "react";
import "./ShowroomOwner.scss";
import { useSelector } from "react-redux";
import { Button, Input, SectionTitle } from "../../components";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";

export const ShowroomOwner = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
  const [addressValue, setAddressValue] = useState("");
  const [addressPhoneValue, setAddressPhoneValue] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [showroomsList, setShowroomsList] = useState([]);

  const [showrooms, setShowrooms] = useState({
    name: "",
    count: 0,
    addresses: [],
    phoneNumbers: [],
  });

  const handleAddButtonClick = () => {
    setIsAdded(true);
    setShowroomsList((prevList) => [...prevList, { ...showrooms }]);
    setShowrooms({
      name: "",
      count: 0,
      addresses: [],
      phoneNumbers: [],
    });
  };
  return (
    <div className="layout-page" id="showroom-owner-page">
      <div className="showroom-owner-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="معارضي"
              subTitle="عدل علي محتوي المعارض التابعه لك "
              className="right"
            />
          </section>
          <section className="rounded white-bg-color create-showroom">
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
                        <h2 className="custom-label" htmlFor="address-name">
                          ضيف عناوين الفروع
                        </h2>
                        <label className="custom-label">عنوان الفرع</label>
                        <Input
                          id="address-name"
                          value={addressValue}
                          onChange={(ev) => setAddressValue(ev.target.value)}
                        />
                        <label className="custom-label">رقم الموبايل</label>
                        <Input
                          id="address-phone"
                          type="tell"
                          value={addressPhoneValue}
                          onChange={(ev) =>
                            setAddressPhoneValue(ev.target.value)
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
                            setShowrooms((prev) => ({
                              ...prev,
                              phoneNumbers: [
                                ...prev.phoneNumbers,
                                addressPhoneValue,
                              ],
                            }));
                            setAddressValue("");
                            setAddressPhoneValue("");
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
                            const updatedPhoneNumbers = [
                              ...showrooms.phoneNumbers,
                            ];
                            updatedPhoneNumbers.splice(i, 1);
                            setShowrooms((prev) => ({
                              ...prev,
                              addresses: [...sr],
                            }));
                            setAddressPhoneValue(updatedPhoneNumbers);
                          }}
                        >
                          <BiX />
                          <span style={{ marginLeft: "0.5rem" }}>{item}</span>
                          <span>{showrooms.phoneNumbers[i]}</span>
                        </span>
                      ))}
                    </div>
                    <Button
                      className={"main-bg-color"}
                      value=" اضافه المعرض"
                      type="button"
                      onClick={handleAddButtonClick}
                    />
                  </div>
                )}
                {showrooms.count >= 10 && (
                  <div className="error-container">
                    <span>عدد الفروع يجب ان يكون اقل من 10</span>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="rounded white-bg-color showroom-container">
            {isAdded && (
              <div>
                {showroomsList.map((showroom, index) => (
                  <div key={index}>
                    <div className="showrooms-details">
                      <div>
                        <h1>اسم المعرض</h1>
                        <h3 className="main-color">{showroom.name}</h3>
                      </div>
                      <div>
                        <h1>عدد الفروع</h1> {showroom.addresses.length}
                      </div>
                      <div>
                        <h1>عنواين الفروع</h1>
                      </div>
                      {showroom.addresses.map((address, addressIndex) => (
                        <div key={addressIndex}>
                          {addressIndex + 1}.
                          <Link to={`/address/${address}`}>
                            {address} - {showroom.phoneNumbers[addressIndex]}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
