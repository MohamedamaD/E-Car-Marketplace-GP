import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BrowseShowrooms.scss";
import { getUserShowroomsAndHandlePagination } from "../../store/slices/showroomOwnerSlice";
import { ShowroomCard } from "../../components/ShowroomCard/ShowroomCard";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../../pages/loading/Loading";
import { EmptySection } from "../EmptySection/EmptySection";
import { ConfirmMessage } from "../../components";
import { Link } from "react-router-dom";

export const BrowseShowrooms = () => {
  const dispatch = useDispatch();
  const { userShowrooms, currentPage, totalPages, loading } = useSelector(
    (state) => state.showroomOwner
  );
  console.log(userShowrooms);
  useEffect(() => {
    dispatch(getUserShowroomsAndHandlePagination(currentPage));
    return () => {};
  }, [dispatch]);
  if (loading) return <Loading />;
  return (
    <section className="rounded white-bg-color browse-showroom">
      <div className="cards-container">
        {userShowrooms.map((showroom) => (
          <div key={showroom?._id} className="wrapper">
            <ShowroomCard props={showroom} />
            <Link to={`/edit-showroom/${showroom?._id}`} className="main-color">
              تعديل
            </Link>
          </div>
        ))}
      </div>
      {userShowrooms?.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          nextClick={() =>
            dispatch(getUserShowroomsAndHandlePagination(currentPage + 1))
          }
          prevClick={() =>
            dispatch(getUserShowroomsAndHandlePagination(currentPage - 1))
          }
          totalPages={totalPages}
        />
      )}
      {userShowrooms?.length === 0 && (
        <EmptySection title="ليس لديك معارض للعرض " />
      )}
    </section>
  );
};
