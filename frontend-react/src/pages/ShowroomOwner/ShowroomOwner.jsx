import React, { useState } from "react";
import "./ShowroomOwner.scss";
import { useSelector } from "react-redux";
import { Button, Input, SectionTitle } from "../../components";
import { BiX } from "react-icons/bi";

export const ShowroomOwner = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user);
  const [addressValue, setAddressValue] = useState("");
  const [showrooms, setShowrooms] = useState({
    name: "",
    count: 0,
    addresses: [],
  });
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
                        <label className="custom-label" htmlFor="address-name">
                          ضيف عناوين الفروع
                        </label>
                        <Input
                          id="address-name"
                          value={addressValue}
                          onChange={(ev) => setAddressValue(ev.target.value)}
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
          </section>
        </main>
      </div>
    </div>
  );
};
