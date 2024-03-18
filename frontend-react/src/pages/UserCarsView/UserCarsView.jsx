import React, { useEffect, useState } from "react";
import {
  Button,
  CarCard,
  ConfirmMessage,
  SectionTitle,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "./UserCarsView.scss";
import {
  deleteCar,
  fetchSellerCarsAndHandlePagination,
} from "../../store/slices/carsSlice";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { Loading } from "../loading/Loading";
import { Pagination } from "../../containers";
import { isFulfilled } from "../../utils";

export const UserCarsView = () => {
  const dispatch = useDispatch();
  const { cars, loading, currentPage, totalPages } = useSelector(
    (state) => state.cars
  );

  const [confirmPanelIsVisible, setVisible] = useState(false);
  const [id, setID] = useState("");

  const emptyCars = cars?.length <= 0;
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchSellerCarsAndHandlePagination(currentPage));
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
                  <Link
                    to={`/car-details/${item?._id}`}
                    className="car-card-wrapper"
                  >
                    <CarCard props={item} />
                  </Link>
                  <div className="buttons-container">
                    <Button
                      className="delete-button"
                      onClick={() => {
                        setVisible(true);
                        setID(item?._id);
                        // document.body.classList.add("hidden");
                      }}
                      value="حذف"
                    />
                    <Link to={`/update-car/${item?._id}`}>
                      <Button value="تعديل" className="main-bg-color" />
                    </Link>
                  </div>
                </div>
              ))}
              {confirmPanelIsVisible && (
                <ConfirmMessage
                  id={id}
                  setVisible={setVisible}
                  deleteHandler={async () => {
                    const response = await dispatch(deleteCar(id));
                    if (isFulfilled(response)) {
                      setVisible(false);
                    } else {
                    }
                  }}
                />
              )}
            </section>
          )}

          {!emptyCars && (
            <section className="rounded white-bg-color pagination-section">
              <Pagination
                nextClick={() => {
                  dispatch(fetchSellerCarsAndHandlePagination(currentPage + 1));
                }}
                prevClick={() => {
                  dispatch(fetchSellerCarsAndHandlePagination(currentPage - 1));
                }}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
