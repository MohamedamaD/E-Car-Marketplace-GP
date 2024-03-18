import React, { useEffect } from "react";
import "./CarDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FullCarCard } from "../../components";
import { Loading } from "../loading/Loading";
import { getCarById } from "../../store/slices/carsSlice";

export const CarDetails = () => {
  const { id } = useParams();
  const { car, loading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarById(id));
  }, [id, dispatch]);

  if (loading) return <Loading />;
  return (
    <div id="car-details">
      <div className="container car-details-container">
        <FullCarCard props={car} />
        
      </div>
    </div>
  );
};
