import React, { useState } from "react";
import "./BuyCar.scss";
import {
  CarCard,
  CustomSelect,
  SectionTitle,
  SwiperBanner,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApiStatus } from "../../utils";
import { Loading } from "../loading/Loading";

export const BuyCar = ({ limit = 8 }) => {
  const { carListings, status } = useSelector((state) => state.data);
  const [sort, setSort] = useState();

  if (status === ApiStatus.LOADING) return <Loading />;
  return (
    <div id="buy-car-page">
      <div className="buy-car-container container">
        <main>
          <SectionTitle
            title="عربيات مستعمله للبيع"
            subTitle="اشتري عربيتك بكل سهوله"
            className="right"
          />
          <div className="filters">
            <h4 className="title secondary-color">حدد بحثك</h4>
          </div>
          <div className="car-market">
            <SwiperBanner />
            <div className="sort-container">
              <p className="p-color">{carListings.length} عربيات</p>
              <div className="select-container">
                <span>ترتيب حسب</span>
                <CustomSelect
                  props={{
                    state: sort,
                    setState: setSort,
                    options: [],
                    id: "select-sort",
                  }}
                />
              </div>
            </div>
            <div className="cars-container">
              {carListings.slice(0, limit).map((car) => (
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
