import React from "react";
import "./SwiperBanner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { images } from "../../constants";
import { Navigation, Pagination } from "swiper/modules";
import {
  BiSolidLeftArrowCircle,
  BiSolidRightArrowCircle,
} from "react-icons/bi";

export const SwiperBanner = () => {
  return (
    <div className="swiper-banner">
      <Swiper
        className="rounded"
        modules={[Navigation, Pagination]}
        navigation={{ prevEl: ".left-arrow", nextEl: ".right-arrow" }}
        pagination={{ clickable: true }}
      >
        {[images.CAR_BANNER_1, images.CAR_BANNER_2, images.CAR_BANNER_3].map(
          (el, i) => (
            <SwiperSlide key={i}>
              <img src={el} alt="" />
            </SwiperSlide>
          )
        )}

        <div className="left-arrow icon-container">
          <BiSolidLeftArrowCircle />
        </div>
        <div className="right-arrow icon-container">
          <BiSolidRightArrowCircle />
        </div>
      </Swiper>
    </div>
  );
};
