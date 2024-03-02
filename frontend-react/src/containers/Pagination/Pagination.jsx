import React from "react";
import { Button } from "../../components";
import "./Pagination.scss";

export const Pagination = ({
  prevClick,
  nextClick,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="pagination-container">
      <Button onClick={prevClick} disabled={currentPage === 1} value="السابق" />

      <span>{`صفحه ${currentPage} من اصل  ${totalPages}`}</span>
      <Button
        onClick={nextClick}
        className="main-bg-color"
        disabled={currentPage === totalPages}
        value="التالي"
      />
    </div>
  );
};
