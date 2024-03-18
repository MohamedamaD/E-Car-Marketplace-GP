import React, { useState } from "react";
import { Button, Input } from "../../components";

export const NewLocation = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  onClick,
}) => {
  const [error, setError] = useState();
  return (
    <section className="rounded white-bg-color add-container">
      <div className="input-field">
        <label className="custom-label" htmlFor="location-name">
          ضيف عنوان الفروع
        </label>
        <Input
          id="location-name"
          name="location-name"
          required
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div className="input-field">
        <label className="custom-label" htmlFor="location-phone">
          رقم هاتف الفرع
        </label>
        <Input
          id="location-phone"
          name="location-phone"
          value={phone}
          type="tel"
          pattern="\d{11}"
          required
          onChange={(ev) => setPhone(ev.target.value)}
        />
      </div>
      <div className="input-field">
        <label className="custom-label" htmlFor="location-address">
          العنوان بالتفاصيل
        </label>
        <Input
          id="location-address"
          name="location-address"
          value={address}
          required
          onChange={(ev) => setAddress(ev.target.value)}
        />
      </div>
      {error && (
        <div className="input-field">
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        </div>
      )}
      <div className="input-field">
        <Button
          value="اضافه"
          onClick={(ev) => {
            if (!name || !address) {
              setError("ادخل بيانات صحيحه");
            } else if (phone.length !== 11) {
              setError("رقم الهاتف يجب ان يكون 11 رقم");
            } else {
              onClick(ev);
            }
          }}
        />
      </div>
    </section>
  );
};
