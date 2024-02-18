import React, { useRef } from "react";
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
  const prev = useRef(null);
  const next = useRef(null);
  return (
    <div className="swiper-banner">
      <Swiper
        className="rounded"
        modules={[Navigation, Pagination]}
        navigation={{ prevEl: prev.current, nextEl: next.current }}
        pagination={{ clickable: true }}
      >
        {[images.CAR_1, images.CAR_1, images.CAR_1].map((el, i) => (
          <SwiperSlide key={i}>
            <img src={el} alt="" />
          </SwiperSlide>
        ))}

        <div className="left-arrow icon-container" ref={prev}>
          <BiSolidLeftArrowCircle />
        </div>
        <div className="right-arrow icon-container" ref={next}>
          <BiSolidRightArrowCircle />
        </div>
      </Swiper>
    </div>
  );
};
