import React, { useEffect } from "react";
import "./Showroom.scss";
import { CarCard, SectionTitle } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowroom } from "../../store/slices/showroomsSlice";
import { Loading } from "../loading/Loading";
import { BiError } from "react-icons/bi";
export const Showroom = () => {
  const { id } = useParams();
  const { currentShowroom, cars, loading } = useSelector(
    (state) => state.showrooms
  );
  const dispatch = useDispatch();
  const showroomName = `معرض ${currentShowroom?.showroomName || ""}`;
  const phoneNumber = currentShowroom?.phoneNumber || "";
  const locations = currentShowroom?.locationsIDs || [];
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchShowroom(id));
    };
    fetchData();
    return () => {};
  }, [id, dispatch]);
  console.log(currentShowroom);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="layout-page" id="showroom-page">
      <div className="showroom-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title={showroomName}
              subTitle="تصفح المعارض والعربيات"
              className="right"
            />
          </section>
          {locations.length > 0 && (
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
          )}

          {locations.length <= 0 && (
            <section className="rounded white-bg-color empty-section">
              <BiError className="main-color" />
              <p>هذا المعرض بدون فروع وعربيات في الوقت الحالي شكرا لك</p>
            </section>
          )}

          {/* {cars.length > 0 && (
            <section className="rounded white-bg-color cars-section">
              <h1 className="title main-color">السيارات</h1>
              <div className="cars-container">
                {cars.map((car) => (
                  <CarCard key={car?._id} />
                ))}
              </div>
            </section>
          )} */}
        </main>
      </div>
    </div>
  );
};
