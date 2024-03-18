import React, { useEffect } from "react";
import "./RecentCars.scss";
import { Button, CarCard, SectionTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarListings } from "../../store/slices/dataSlice";
import { Link } from "react-router-dom";
import { ApiStatus } from "../../utils";
import { Loading } from "../../pages";
import { getCars } from "../../store/slices/carsSlice";

export const RecentCars = () => {
  const { cars, loading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getCars({ page: 1 }));
    return () => {};
  }, [dispatch]);

  if (loading) return <Loading />;
  console.log(cars);
  return (
    <div className="recent-cars">
      <SectionTitle
        subTitle="مجموعة متنوعة من عربيات"
        title="أضيف مؤخرا"
        className="right"
      >
        <Link to="/buy-car">
          <Button value="تصفح كل العربيات" />
        </Link>
      </SectionTitle>
      <div className="recent-container">
        <main>
          {cars.map((car) => (
            <Link key={car?._id} to={`/car-details/${car?._id}`}>
              <CarCard props={car} />
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

// TODO: using Slice for now but next api version will add pagination [offset - limit]
