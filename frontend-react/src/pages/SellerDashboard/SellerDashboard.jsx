import React from "react";
import { Link } from "react-router-dom";

export const SellerDashboard = () => {
  return (
    <div className="layout-page" id="seller-dashboard-page">
      <div className="seller-dashboard-container container">
        <main>
          <section className="links-section white-bg-color">
            <Link to="/sell-car">اضافه عربيه</Link>
            <Link to="/my-cars">تعديل عربيه</Link>
          </section>
        </main>
      </div>
    </div>
  );
};
