import React, { useEffect, useState } from "react";
import "./RecommendationResult.scss";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { CarCard } from "../CarCard/CarCard";

export const RecommendationResult = () => {
  const { isPhoto, singleResult, multipleResult } = useSelector(
    (state) => state.recommendation
  );
  console.log(multipleResult);
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
        </main>
      </div>
    </div>
  );
};
