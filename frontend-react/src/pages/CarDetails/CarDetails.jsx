import React, { useEffect } from "react";
import "./CarDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../store/slices/dataSlice";
import { Loading } from "../loading/Loading";
import { FullCarCard } from "../../components";

export const CarDetails = () => {
  const { id } = useParams();
  const { currentCar, status } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [id, dispatch]);

  if (status === "loading") return <Loading />;
  return (
    <div id="car-details">
      <div className="container car-details-container">
        <FullCarCard props={currentCar} />
      </div>
    </div>
  );
};
