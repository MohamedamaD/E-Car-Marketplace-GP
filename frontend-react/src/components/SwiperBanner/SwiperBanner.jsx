import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../pages";
import { getTrendingBanners } from "../../store/slices/mediaSlice";

export const SwiperBanner = () => {
  const { loading, banners } = useSelector((state) => state.media);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingBanners());
    return () => {};
  }, [dispatch]);
  
  if (loading) return <Loading />;
  return (
    <div className="swiper-banner">
      <Swiper
        className="rounded"
        modules={[Navigation, Pagination]}
        navigation={{ prevEl: ".left-arrow", nextEl: ".right-arrow" }}
        pagination={{ clickable: true }}
      >
        {banners.map((el) => (
          <SwiperSlide key={el?._id}>
            <img src={`http://localhost:5000/${el?.imageURL}`} alt="banner" />
          </SwiperSlide>
        ))}

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
