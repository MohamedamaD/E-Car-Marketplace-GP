import React, { useEffect, useState } from "react";
import "./Showrooms.scss";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, SectionTitle } from "../../components";
import { Link } from "react-router-dom";
import {
  fetchShowroomsAndHandlePagination,
  // fetchShowroomsAndHandleSearch,
} from "../../store/slices/showroomsSlice";
import { Loading } from "../loading/Loading";
export const Showrooms = () => {
  const [searchValue, setSearchValue] = useState("");
  const { showrooms, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.showrooms
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchShowroomsAndHandlePagination(currentPage, searchValue));
    };
    fetchData();
    return () => {};
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="layout-page" id="showrooms-page">
      <div className="showrooms-container container">
        <main>
          <section className="rounded white-bg-color">
            <SectionTitle
              title="أفضل المعارض"
              subTitle="تصفح المعارض واختار عربيتك علي مزاجك"
              className="right"
            />
          </section>
          <section className="rounded white-bg-color search-section">
            <form
              action=""
              onSubmit={(ev) => {
                ev.preventDefault();
                dispatch(
                  fetchShowroomsAndHandlePagination(currentPage, searchValue)
                );
              }}
            >
              <div className="input-field">
                <label htmlFor="showroom-name" className="custom-label">
                  اسم المعرض
                </label>
                <div className="search-container">
                  <Input
                    id="showroom-name"
                    name="showroom-name"
                    value={searchValue}
                    placeholder="ابحث ..."
                    onChange={(ev) => setSearchValue(ev.target.value)}
                  />
                  <Button className="main-bg-color" value="بحث" />
                </div>
              </div>
            </form>
          </section>

          <section className="rounded white-bg-color showrooms-section">
            {showrooms.map((item) => (
              <Link to={`/showroom/${item?._id}`} key={item?._id}>
                <h3 className="shadow">{item?.showroomName}</h3>
              </Link>
            ))}
          </section>
          <section className="rounded white-bg-color pagination-section">
            <Button
              onClick={() =>
                dispatch(
                  fetchShowroomsAndHandlePagination(
                    currentPage - 1,
                    searchValue
                  )
                )
              }
              disabled={currentPage === 1}
              value="السابق"
            />

            <span>{`صفحه ${currentPage} من اصل  ${totalPages}`}</span>
            <Button
              onClick={() =>
                dispatch(
                  fetchShowroomsAndHandlePagination(
                    currentPage + 1,
                    searchValue
                  )
                )
              }
              className="main-bg-color"
              disabled={currentPage === totalPages}
              value="التالي"
            />
          </section>
        </main>
      </div>
    </div>
  );
};
