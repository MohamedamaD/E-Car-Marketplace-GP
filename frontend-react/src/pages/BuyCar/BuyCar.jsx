import React, { useEffect, useState } from "react";
import "./BuyCar.scss";
import {
  CarCard,
  CustomSelect,
  SectionTitle,
  SwiperBanner,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApiStatus, compareFeature, sortCars } from "../../utils";
import { Loading } from "../loading/Loading";
import { CarConstants, SortingList } from "../../constants";
import { fetchCarByName, fetchCarListings } from "../../store/slices/dataSlice";

export const BuyCar = ({ limit = 8 }) => {
  const { carListings, status } = useSelector((state) => state.data);
  const [sort, setSort] = useState("default");
  const [carName, setCarName] = useState("default");
  const [transmissions, setTransmissions] = useState("default");

  const sortedCars =
    transmissions === "default"
      ? sortCars(sort, carListings)
      : compareFeature(
          transmissions,
          "transmission",
          sortCars(sort, carListings)
        );

  const dispatch = useDispatch();

  useEffect(() => {
    if (carName !== "default") {
      dispatch(fetchCarByName(carName));
    } else {
      dispatch(fetchCarListings(8));
    }
    return () => {};
  }, [carName, dispatch]);

  if (status === ApiStatus.LOADING) return <Loading />;
  return (
    <div id="buy-car-page">
      <div className="buy-car-container container">
        <SectionTitle
          title="عربيات مستعمله للبيع"
          subTitle="اشتري عربيتك بكل سهوله"
          className="right"
        />
        <main>
          <div className="filters">
            <h4 className="title secondary-color">حدد بحثك</h4>
            <section>
              {/* <div className="section-container">
                <h4 className="subtitle secondary-color">السعر</h4>
              </div> */}
              <div className="section-container">
                <h4 className="subtitle secondary-color">الماركة و الموديل</h4>
                <CustomSelect
                  state={carName}
                  setState={setCarName}
                  label=""
                  options={CarConstants.models}
                  id="model-select"
                />
              </div>
              <div className="section-container">
                <h4 className="subtitle secondary-color">ناقل الحركة</h4>
                <CustomSelect
                  state={transmissions}
                  setState={setTransmissions}
                  label=""
                  options={CarConstants.transmissions}
                  id="transmissions-select"
                />
              </div>
            </section>
          </div>
          <div className="car-market">
            <SwiperBanner />
            <div className="sort-container">
              <p className="p-color">{sortedCars.length} عربيات</p>
              <div className="select-container">
                <span>ترتيب حسب</span>
                <CustomSelect
                  state={sort}
                  setState={setSort}
                  label=""
                  options={SortingList}
                  id="select-sort"
                />
              </div>
            </div>
            <div className="cars-container">
              {sortedCars.slice(0, limit).map((car) => (
                <Link key={car?.id} to={`/car-details/${car?.id}`}>
                  <CarCard props={car} />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
