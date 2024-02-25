import React from "react";
import "./Home.scss";
import { BannerUploader, Header, RecentCars, SiteWork } from "../../containers";
import { Banner } from "../../components";

export const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Banner />
      <div className="container">
        <BannerUploader />
        <RecentCars />
      </div>
      <div className="container home-container">
        <SiteWork />
      </div>
    </div>
  );
};
