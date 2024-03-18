import React, { useEffect, useState } from "react";
import {
  Button,
  CarInformation,
  ImageUploader,
  SectionTitle,
} from "../../components";
import {
  addCarToShowroom,
  getShowrooms,
} from "../../store/slices/showroomOwnerSlice";
import { useSelector, useDispatch } from "react-redux";
import { generateCarInfo, handleImageUpload, isFulfilled } from "../../utils";
import "./AddCarToShowroom.scss";
import { Loading } from "../loading/Loading";
import { useHistory } from "react-router-dom";
export const AddCarToShowroom = () => {
  const { userShowrooms: showrooms, loading } = useSelector(
    (state) => state.showroomOwner
  );

  const dispatch = useDispatch();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [transmission, setTransmission] = useState("");
  const [features, setFeatures] = useState([]);
  const [license, setLicense] = useState("");
  const [showroomID, setShowroomID] = useState("");

  const [images, setImages] = useState([]);
  const imageChangeHandler = (event) => {
    handleImageUpload(event, setImages);
  };

  const history = useHistory();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = generateCarInfo(
      make,
      model,
      year,
      price,
      mileage,
      color,
      description,
      transmission,
      license,
      features,
      images
    );
    formData.append("showroomID", showroomID);
    const response = await dispatch(addCarToShowroom(formData));
    if (isFulfilled(response)) {
      history.push("/my-cars");
    }
  };
  useEffect(() => {
    dispatch(getShowrooms({ total: true }));
    return () => {};
  }, [dispatch]);

  if (loading) return <Loading />;
  return (
    <div className="layout-page" id="add-car-to-showroom-page">
      <div className="add-car-to-showroom-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="تفاصيل العربيه"
              subTitle="ادخل تفاصيل العربيه كامله متنساش صور العربيه "
              className="right"
            />
          </section>

          <section className="rounded white-bg-color">
            <form
              action=""
              method="post"
              encType="multipart/form-data"
              className="data-form"
              onSubmit={onSubmitHandler}
            >
              <CarInformation
                make={make}
                setMake={setMake}
                model={model}
                setModel={setModel}
                year={year}
                setYear={setYear}
                price={price}
                setPrice={setPrice}
                mileage={mileage}
                setMileage={setMileage}
                color={color}
                setColor={setColor}
                description={description}
                setDescription={setDescription}
                transmission={transmission}
                setTransmission={setTransmission}
                traffic={license}
                setTraffic={setLicense}
              >
                <CarInformation.Showrooms
                  showroomID={showroomID}
                  setShowroomID={setShowroomID}
                  showrooms={showrooms}
                />
              </CarInformation>
              <CarInformation.Features
                features={features}
                setFeatures={setFeatures}
              />
              <ImageUploader
                handleImageUpload={imageChangeHandler}
                images={images}
                setImages={setImages}
                name="car-images"
                label="صور العربيه"
              />
              <div className="description">
                <CarInformation.Description
                  description={description}
                  setDescription={setDescription}
                />
              </div>
              <Button value="اضافه" />
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};
