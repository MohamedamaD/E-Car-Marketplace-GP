import React from "react";
import "./ShowroomOwnerDashboard.scss";
import { Link } from "react-router-dom";
export const ShowroomOwnerDashboard = () => {
  return (
    <div className="layout-page" id="showroom-owner-dashboard-page">
      <div className="showroom-owner-dashboard-container container">
        <main>
          <section className="links-section white-bg-color">
            <Link to="/add-showroom">اضافه معرض</Link>
            <Link to="/edit-showrooms">تعديل المعارض</Link>
            <Link to="/sell-car">اضافه عربيه</Link>
            <Link to="/my-cars">تعديل عربيه</Link>
          </section>
        </main>
      </div>
    </div>
  );
};
