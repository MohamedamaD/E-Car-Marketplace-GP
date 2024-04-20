import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./EditShowroom.scss";
import { Loading } from "../loading/Loading";
import {
  Button,
  CarCard,
  ConfirmMessage,
  Input,
  LocationCard,
} from "../../components";
import { images } from "../../constants";
import { BiX } from "react-icons/bi";
import { isFulfilled } from "../../utils";
import {
  deleteCarFromShowroom,
  deleteShowroom,
  editShowrooms,
  getShowroomById,
  updateShowroomImage,
} from "../../store/slices/showroomOwnerSlice";
import { EmptySection, NewLocation } from "../../containers";
import { Link } from "react-router-dom";
import { deleteCar } from "../../store/slices/carsSlice";

export const EditShowroom = () => {
  const { id } = useParams();
  const { loading, showroom, showroomCars } = useSelector(
    (state) => state.showroomOwner
  );
  const [confirmPanelIsVisible, setVisible] = useState(false);
  const [carID, setID] = useState("");
  const [temp, setTemp] = useState(showroom);
  const [image, setImage] = useState();
  const [isOpen, setOpen] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [newPhone, setPhone] = useState("");
  const [newName, setName] = useState("");
  const [newAddress, setAddress] = useState("");
  const notFound = showroom === null;

  useEffect(() => {
    const fetchData = () => {
      dispatch(getShowroomById(id));
    };
    fetchData();
    return () => {};
  }, [id, dispatch]);

  useEffect(() => {
    setTemp(showroom);
  }, [showroom]);

  const tempChangeHandler = (event) => {
    const { name, value } = event.target;
    setTemp((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (event) => {
    dispatch(editShowrooms({ id, payload: temp }));
  };

  if (loading) return <Loading />;
  console.log(showroom);
  return (
    <div className="layout-page" id="edit-showroom-page">
      <div className="edit-showroom-container container">
        {notFound && (
          <main>
            <section className="rounded white-bg-color not-found">
              <p>هذا المعرض لم يعد متوفر الان</p>
            </section>
          </main>
        )}
        {!notFound && (
          <main>
            <section className="rounded white-bg-color avatar">
              <div className="image-container shadow">
                <img
                  src={
                    temp?.image
                      ? `http://localhost:5000/${temp?.image}`
                      : images.EMPTY_AVATAR
                  }
                  alt="temp-avatar"
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    className="new-image"
                    alt=""
                  />
                )}
              </div>
              <Button value="تحميل الصوره" type="button">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  onChange={(ev) => setImage(ev.target.files[0])}
                  required
                />
              </Button>

              {image && (
                <Button
                  onClick={async () => {
                    const formData = new FormData();
                    formData.append("image", image);
                    const response = await dispatch(
                      updateShowroomImage({ id, payload: formData })
                    );
                    if (isFulfilled(response)) {
                      setImage("");
                    }
                  }}
                  className="dark-green-bg-color"
                  value="حفظ الصوره"
                />
              )}
            </section>
            <section className="rounded white-bg-color showroom-info">
              <form action="">
                <div className="input-field">
                  <label className="custom-label" htmlFor="showroom-name">
                    اسم المعرض
                  </label>
                  <Input
                    id="showroom-name"
                    name="name"
                    value={temp?.name}
                    onChange={tempChangeHandler}
                  />
                </div>
                <div className="input-field">
                  <label
                    className="custom-label"
                    htmlFor="showroom-description"
                  >
                    وصف
                  </label>
                  <Input
                    id="showroom-description"
                    name="description"
                    value={temp?.description}
                    onChange={tempChangeHandler}
                  />
                </div>
              </form>
            </section>
            {temp?.locations?.length > 0 ? (
              <section className="rounded white-bg-color locations-info">
                {temp?.locations.map((item, index) => (
                  <div className="location-wrapper" key={item?._id || index}>
                    <LocationCard props={item} key={item?._id} />
                    <div
                      className="icon-container"
                      onClick={() => {
                        const remainingLocations = [...temp?.locations];
                        remainingLocations.splice(index, 1);
                        setTemp((prev) => ({
                          ...prev,
                          locations: remainingLocations,
                        }));
                      }}
                    >
                      <BiX />
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <EmptySection title="لا يوجد فروع يجب اضافه فروع" />
            )}

            {isOpen && (
              <NewLocation
                address={newAddress}
                setAddress={setAddress}
                name={newName}
                setName={setName}
                phone={newPhone}
                setPhone={setPhone}
                onClick={() => {
                  setTemp((prev) => ({
                    ...prev,
                    locations: [
                      ...prev.locations,
                      {
                        name: newName,
                        phone: newPhone,
                        address: newAddress,
                      },
                    ],
                  }));
                  setAddress("");
                  setName("");
                  setPhone("");
                  setOpen(false);
                }}
              />
            )}

            {ConfirmDelete && (
              <ConfirmMessage
                setVisible={setConfirmDelete}
                deleteHandler={async () => {
                  const response = await dispatch(deleteShowroom(id));
                  if (isFulfilled(response)) {
                    history.go(-1);
                  }
                }}
              />
            )}

            {showroomCars.length > 0 && (
              <section className="rounded white-bg-color showroom-cars-section">
                <p className="title main-color">السيارات</p>
                <div className="cars-container">
                  {showroomCars.map((car) => (
                    <div key={car?._id}>
                      <CarCard props={car} />
                      <div className="buttons-container">
                        <Button
                          className="delete-button"
                          onClick={() => {
                            setVisible(true);
                            setID(car?._id);
                            // document.body.classList.add("hidden");
                          }}
                          value="حذف"
                        />
                        <Link to={`/update-car/${car?._id}`}>
                          <Button value="تعديل" className="main-bg-color" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {confirmPanelIsVisible && (
              <ConfirmMessage
                id={id}
                setVisible={setVisible}
                deleteHandler={async () => {
                  const response = await dispatch(
                    deleteCarFromShowroom({ showroomID: id, carID })
                  );
                  if (isFulfilled(response)) {
                    setVisible(false);
                    history.go(0);
                  } else {
                  }
                }}
              />
            )}
            <section className="rounded white-bg-color options-buttons">
              <Button
                className="delete-button"
                value="حذف المعرض"
                onClick={() => setConfirmDelete(true)}
              />
              <Button
                className="main-bg-color"
                value="حفظ التغيرات"
                onClick={submitHandler}
              />
              <Button
                value="اضافه فرع"
                onClick={() => setOpen((prev) => !prev)}
              />
            </section>
          </main>
        )}
      </div>
    </div>
  );
};
