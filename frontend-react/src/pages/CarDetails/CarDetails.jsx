import React, { useEffect } from "react";
import "./CarDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarById } from "../../store/slices/dataSlice";
import { FullCarCard } from "../../components";
import { ApiStatus } from "../../utils";
import { Loading } from "../loading/Loading";

export const CarDetails = () => {
  const { id } = useParams();
  const { currentCar, status: dataLoading } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [id, dispatch]);

  if (dataLoading === ApiStatus.LOADING) return <Loading />;
  return (
    <div id="car-details">
      <div className="container car-details-container">
        <FullCarCard props={currentCar} />
      </div>
    </div>
  );
};
