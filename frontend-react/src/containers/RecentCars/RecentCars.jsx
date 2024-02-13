import React, { useEffect } from "react";
import "./RecentCars.scss";
import { CarCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarListings } from "../../store/slices/dataSlice";
import { Link } from "react-router-dom";
import { Loading } from "../../pages";

export const RecentCars = ({ limit = 4 }) => {
  const { carListings, status } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarListings());
    return () => {};
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  return (
    <div className="recent-cars">
      <div className="recent-container">
        <main>
          {carListings.slice(0, limit).map((car) => (
            <Link key={car?.id} to={`/car-details/${car?.id}`}>
              <CarCard props={car} />
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

// TODO: using Slice for now but next api version will add pagination [offset - limit]
