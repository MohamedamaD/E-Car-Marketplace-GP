import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { Loading } from "../loading/Loading";
import { getUserCar, updateCarDetails } from "../../store/slices/carsSlice";
import { Button, Input, SectionTitle } from "../../components";
import "./UpdateCar.scss";
import { isFulfilled } from "../../utils";

export const UpdateCar = () => {
  const { id } = useParams();
  const { loading, car } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(getUserCar(id));
  }, [id, dispatch]);

  useEffect(() => {
    setFormData(car);
  }, [car]);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const response = await dispatch(
      updateCarDetails({ id, payload: formData })
    );
    if (isFulfilled(response)) {
      history.push("/my-cars");
    } else {
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="layout-page" id="update-car-page">
      <div className="update-car-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="تحديث السياره"
              subTitle="قم التعديل بحذر والا سوف يتم مسح العربيه نهائيا"
              className="right"
            />
          </section>
          <section className="rounded white-bg-color form-section">
            <form onSubmit={submitHandler}>
              <div className="form-container">
                <div className="input-field">
                  <label htmlFor="make" className="custom-label">
                    ماركة العربية
                  </label>
                  <Input
                    type="text"
                    id="make"
                    name="make"
                    value={formData?.make}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="model" className="custom-label">
                    الموديل
                  </label>
                  <Input
                    type="text"
                    id="model"
                    name="model"
                    value={formData?.model}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="year" className="custom-label">
                    السنة
                  </label>
                  <Input
                    type="text"
                    id="year"
                    name="year"
                    value={formData?.year}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="price" className="custom-label">
                    السعر
                  </label>
                  <Input
                    type="text"
                    id="price"
                    name="price"
                    value={formData?.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="mileage" className="custom-label">
                    كيلومتر
                  </label>
                  <Input
                    type="text"
                    id="mileage"
                    name="mileage"
                    value={formData?.mileage}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="color" className="custom-label">
                    اللون
                  </label>
                  <Input
                    type="text"
                    id="color"
                    name="color"
                    value={formData?.color}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="transmission" className="custom-label">
                    ناقل الحركه
                  </label>
                  <Input
                    type="text"
                    id="transmission"
                    name="transmission"
                    value={formData?.transmission}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="license" className="custom-label">
                    مقر الترخيص
                  </label>
                  <Input
                    type="text"
                    id="license"
                    name="license"
                    value={formData?.license}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="description" className="custom-label">
                  وصف
                </label>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={formData?.description}
                  className="custom-textarea"
                ></textarea>
              </div>
              <Button value="تعديل" />
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};
