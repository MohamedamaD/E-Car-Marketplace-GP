import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { hero, images } from "../../constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Header.scss";

export const Header = () => {
  const swiperOptions = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    spaceBetween: 50,
    preventInteractionOnTransition: true,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  return (
    <header id="home-header">
      <main>
        <Swiper {...swiperOptions}>
          {hero.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="overlay"></div>
              <img src={item.img} alt="car" className="slider-opacity" />
              <div className="text-overlay">
                <h1 className="white-color">{item.h1}</h1>
                <p className="white-color">{item.p}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </header>
  );
};
