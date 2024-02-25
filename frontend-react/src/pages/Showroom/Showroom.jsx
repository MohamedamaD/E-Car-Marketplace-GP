import React, { useEffect, useState } from "react";
import "./Showroom.scss";
import { CarCard, SectionTitle } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
export const Showroom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showroom, setShowroom] = useState();
  const cars = showroom?.cars || [];
  useEffect(() => {
    const fetchData = async () => {
      //   const res = await dispatch(fetchShowroom(id));
      // console.log(res);
      //   setShowroom(res.data)
    };
    fetchData();
    return () => {};
  }, [id, dispatch]);
  return (
    <div className="layout-page" id="showroom-page">
      <div className="showroom-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="معرض + اسم المعرض " // showroom?.name
              subTitle="تصفح كل العربيات"
              className="right"
            />
          </section>
          <section className="rounded white-bg-color">
            <div className="cars-container">
              {cars.map((item, i) => (
                <CarCard key={i} props={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
