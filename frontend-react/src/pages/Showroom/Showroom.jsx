import React, { useEffect, useState } from "react";
import "./Showroom.scss";
import { CarCard, SectionTitle } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowroom } from "../../store/slices/dataSlice";
export const Showroom = () => {
  const { id } = useParams();
  const { showroom } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const showroomName = `معرض ${showroom?.showroomName || ""}`;
  const phoneNumber = showroom?.phoneNumber || "";
  const locations = showroom?.locationsIDs || [];
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchShowroom(id));
    };
    fetchData();
    return () => {};
  }, [id, dispatch]);
  console.log(showroom);
  return (
    <div className="layout-page" id="showroom-page">
      <div className="showroom-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title={showroomName} // showroom?.name
              subTitle="تصفح المعارض والعربيات"
              className="right"
            />
          </section>
          <section className="rounded white-bg-color locations-section">
            <h1 className="title main-color">اختار فرعك</h1>
            <div className="location-container">
              {locations.map((item, i) => (
                <div
                  key={item?._id}
                  className="shadow location-wrapper"
                  onClick={async () => {
                    // const res = await dispatch(getLocation(item?._id));
                    // setCars(res.payload.cars);
                  }}
                >
                  <p className="secondary-color">
                    <span>فرع</span> <span>{item?.locationName}</span>
                  </p>
                  <p className="phone">
                    <span>رقم الهاتف</span> <span>{phoneNumber}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
          {cars.length > 0 && (
            <section className="rounded white-bg-color cars-section">
              <h1 className="title main-color">السيارات</h1>
              <div className="cars-container">
                {cars.map((car) => (
                  <CarCard key={car?._id} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
