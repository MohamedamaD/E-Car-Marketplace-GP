import React from "react";
import "./Home.scss";
import { BannerUploader, Header, SiteWork } from "../../containers";
import { Banner } from "../../components";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.authentication);
  return (
    <div className="Home">
      <Header />
      <Banner />
      <div className="container">
        {(user?.role === "seller" || user?.role === "showroom-owner") && (
          <BannerUploader />
        )}
        {/* <RecentCars /> */}
      </div>
      <div className="container home-container">
        <SiteWork />
      </div>
    </div>
  );
};
