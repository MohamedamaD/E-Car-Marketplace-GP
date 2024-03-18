import React, { useEffect, useState } from "react";
import "./BuyCar.scss";
import {
  CarCard,
  CustomCompo,
  CustomSelect,
  RangeSlider,
  SectionTitle,
  SwiperBanner,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading/Loading";
import { CarConstants, SortingList } from "../../constants";
import { Models, Transmission } from "../../constants/CarConstants";
import { BiDownArrowAlt } from "react-icons/bi";
import { Pagination } from "../../containers";
import { getCarsAndHandlePagination } from "../../store/slices/carsSlice";
import { Link } from "react-router-dom";

export const BuyCar = () => {
  const dispatch = useDispatch();
  const { cars, loading, totalPages, currentPage } = useSelector(
    (state) => state.cars
  );
  const [range, setRange] = useState([0, 100000]);
  const [sort, setSort] = useState("default");
  const [transmissionsState, setTransmissionsState] = useState([]);
  const [modelsState, setModelsState] = useState([]);

  const changeStateHandler = (prev, element) => {
    let next = [...prev];
    const index = next.indexOf(element);
    if (index !== -1) {
      next.splice(index, 1);
    } else {
      next.push(element);
    }
    return next;
  };
  console.log(modelsState);
  useEffect(() => {
    dispatch(
      getCarsAndHandlePagination(
        currentPage,
        sort,
        modelsState,
        transmissionsState,
        range[0],
        range[1]
      )
    );
    return () => {};
  }, [dispatch, transmissionsState, modelsState]);

  if (loading) return <Loading />;
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
            <p className="title secondary-color">حدد بحثك</p>
            <section>
              <div className="section-container">
                <h4 className="subtitle secondary-color">السعر</h4>
                <RangeSlider
                  value={range}
                  min={0}
                  max={100000}
                  setValue={setRange}
                />
              </div>

              <details>
                <summary className="subtitle secondary-color">
                  <span>الماركة</span>
                  <BiDownArrowAlt />
                </summary>
                <div className="data-wrapper">
                  {Models.map((el, i) => (
                    <p
                      className={`shadow rounded ${
                        modelsState.includes(el) ? "active" : ""
                      }`}
                      key={i}
                      onClick={() => {
                        setModelsState((prev) => {
                          return changeStateHandler(prev, el);
                        });
                      }}
                    >
                      {el}
                    </p>
                  ))}
                </div>
              </details>
              <details>
                <summary className="subtitle secondary-color">
                  <span>ناقل الحركه</span>
                  <BiDownArrowAlt />
                </summary>
                <div className="data-wrapper">
                  {Transmission.map((el, i) => (
                    <p
                      className={`shadow rounded ${
                        transmissionsState.includes(el) ? "active" : ""
                      }`}
                      key={i}
                      onClick={() => {
                        setTransmissionsState((prev) => {
                          return changeStateHandler(prev, el);
                        });
                      }}
                    >
                      {el}
                    </p>
                  ))}
                </div>
              </details>
            </section>
          </div>
          <div className="car-market">
            <SwiperBanner />
            <div className="sort-container">
              <p className="p-color">{cars.length} عربيات</p>
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
              {cars.map((car) => (
                <Link key={car?._id} to={`/car-details/${car?._id}`}>
                  <CarCard props={car} />
                </Link>
              ))}
            </div>
            {cars.length !== 0 && (
              <div className="rounded white-bg-color pagination-section">
                <Pagination
                  currentPage={currentPage}
                  nextClick={() =>
                    dispatch(
                      getCarsAndHandlePagination(
                        currentPage + 1,
                        sort,
                        modelsState,
                        transmissionsState,
                        range[0],
                        range[1]
                      )
                    )
                  }
                  totalPages={totalPages}
                  prevClick={() =>
                    dispatch(
                      getCarsAndHandlePagination(
                        currentPage - 1,
                        sort,
                        modelsState,
                        transmissionsState,
                        range[0],
                        range[1]
                      )
                    )
                  }
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
