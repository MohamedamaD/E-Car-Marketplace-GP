import React, { useEffect, useState } from "react";
import "./RecommendationResult.scss";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { CarCard } from "../CarCard/CarCard";
import { Link } from "react-router-dom";
export const RecommendationResult = () => {
  const { isPhoto, singleResult, multipleResult } = useSelector(
    (state) => state.recommendation
  );
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const searchCars = async ({ make, model, year }) => {
      const res = await api.get(
        `/cars/searchByFields/q?make=${make}&model=${model}&year=${year}`
      );

      return res.data;
    };
    if (singleResult) {
      const [make, model, style, year] = singleResult.split(" ");
      searchCars({ make, model, year }).then((result) =>
        setSearchResult(result)
      );
    } else if (multipleResult) {
      setSearchResult([]);
      multipleResult.forEach((item) => {
        searchCars({
          make: item.Make,
          model: item.Model,
          year: item.Year,
        }).then((result) => setSearchResult((prev) => [...prev, ...result]));
      });
    }
    return () => {};
  }, [singleResult, multipleResult]);
  console.log(searchResult);
  return (
    <div className="layout-page" id="recommendation-result-page">
      <div className="recommendation-result-container container">
        <main>
          <section className="rounded white-bg-color">
            <p className="p-title">نتيجه البحث</p>
          </section>
          <section className="rounded white-bg-color result-section">
            {isPhoto && <p className="p-title">{singleResult}</p>}
            {!isPhoto && (
              <div>
                <p className="p-title main-color">المقتراحات</p>

                <div>
                  {multipleResult.map((car, i) => (
                    <p key={i} className="p-title">
                      <span>{car.Make} </span>
                      <span>{car.Model} </span>
                      <span>{car.Year} </span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </section>

          {searchResult.length !== 0 && (
            <section className="rounded white-bg-color search-result-section">
              <p className="p-title mb-1rem">عربيات مماثله علي موقعنا</p>
              <div className="content">
                {searchResult.map((car) => (
                  <Link to={`/car-details/${car._id}`} key={car._id}>
                    <CarCard props={car} />
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
