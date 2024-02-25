import React, { useEffect } from "react";
import "./RecentCars.scss";
import { Button, CarCard, SectionTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarListings } from "../../store/slices/dataSlice";
import { Link } from "react-router-dom";
import { ApiStatus } from "../../utils";
import { Loading } from "../../pages";

export const RecentCars = ({ limit = 4 }) => {
  const { carListings, status: dataLoading } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarListings(8));
    return () => {};
  }, [dispatch]);
  if (dataLoading === ApiStatus.LOADING) return <Loading />;

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
          {carListings.map((car) => (
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
