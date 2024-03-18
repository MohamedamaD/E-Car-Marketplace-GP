import React, { useEffect } from "react";
import "./Showroom.scss";
import { CarCard, LocationCard, SectionTitle } from "../../components";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowroom } from "../../store/slices/showroomsSlice";
import { Loading } from "../loading/Loading";
import { EmptySection } from "../../containers/EmptySection/EmptySection";
import { images } from "../../constants";
export const Showroom = () => {
  const { id } = useParams();
  const { currentShowroom, currentShowroomCars, loading } = useSelector(
    (state) => state.showrooms
  );
  const dispatch = useDispatch();
  const name = `معرض ${currentShowroom?.name || ""}`;
  const description =
    currentShowroom?.description || "تصفح المعرض والعربيات بكل سهوله";
  const locations = currentShowroom?.locations || [];
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchShowroom(id));
    };
    fetchData();
    return () => {};
  }, [id, dispatch]);
  console.log(currentShowroomCars);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="layout-page" id="showroom-page">
      <div className="showroom-container container">
        <main>
          <section className="rounded white-bg-color title-section">
            <div className="image-container rounded">
              <img
                src={
                  currentShowroom?.image
                    ? `http://localhost:5000/${currentShowroom?.image}`
                    : images.EMPTY_AVATAR
                }
                alt="showroom-avatar"
              />
            </div>
            <SectionTitle
              title={name}
              subTitle={description}
              className="right"
            />
          </section>
          {locations.length > 0 && (
            <section className="rounded white-bg-color locations-section">
              <h1 className="title black-color">الفروع</h1>
              <div className="location-container">
                {locations.map((item) => (
                  <LocationCard props={item} key={item?._id} />
                ))}
              </div>
            </section>
          )}

          {locations.length <= 0 && (
            <EmptySection title="هذا المعرض بدون فروع وعربيات في الوقت الحالي شكرا لك" />
          )}

          {currentShowroomCars.length > 0 && (
            <section className="rounded white-bg-color cars-section">
              <p className="title main-color">السيارات</p>
              <div className="cars-container">
                {currentShowroomCars.map((car) => (
                  <Link to={`/car-details/${car?._id}`}>
                    <CarCard key={car?._id} props={car} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
