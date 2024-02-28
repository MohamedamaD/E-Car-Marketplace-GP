import React, { useEffect, useState } from "react";
import {
  Button,
  CarCard,
  ConfirmMessage,
  SectionTitle,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "./UserCarsView.scss";
import { getPersonalCars } from "../../store/slices/carsSlice";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { Loading } from "../loading/Loading";
export const UserCarsView = () => {
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.cars);
  const [confirmPanelIsVisible, setVisible] = useState(false);
  const [id, setID] = useState("");
  const emptyCars = cars?.length <= 0;
  useEffect(() => {
    const fetchData = () => {
      dispatch(getPersonalCars());
    };
    fetchData();
    return () => {};
  }, [dispatch]);
  
  if (loading) return <Loading />;

  return (
    <div className="layout-page" id="cars-view">
      <div className="container cars-view-container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              subTitle="تصفح كل عربياتك"
              title="عربياتك"
              className="right"
            />
          </section>
          {emptyCars && (
            <section className="empty-container rounded white-bg-color">
              <BiPlus />
              <div>
                <p>
                  ليس هناك عربيات اذهب لصفحه بيع العربيات من
                  <Link to="/sell-car" className="main-color">
                    {" "}
                    هنا{" "}
                  </Link>
                </p>
              </div>
            </section>
          )}
          {!emptyCars && (
            <section className="rounded white-bg-color cars-section">
              {cars.map((item) => (
                <div className="car-container" key={item?._id}>
                  <Link to={`/car-details/${item?._id}`}>
                    <CarCard props={item} />
                  </Link>
                  <Button
                    className="delete-button"
                    onClick={() => {
                      setVisible(true);
                      setID(item?._id);
                      // document.body.classList.add("hidden");
                    }}
                    value="حذف"
                  />
                </div>
              ))}
              {confirmPanelIsVisible && (
                <ConfirmMessage id={id} setVisible={setVisible} />
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
