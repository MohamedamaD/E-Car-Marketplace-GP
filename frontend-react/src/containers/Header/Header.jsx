import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "../../constants";
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
    autoplay: { delay: 1000, disableOnInteraction: false },
  };

  return (
    <header id="home-header">
      <main>
        <Swiper {...swiperOptions}>
          <SwiperSlide>
            <img src={images.HERO} alt="car" className="slider-opacity" />
            <div className="text-overlay">
              <h1>عربيات مستعملة بدون تنازلات!</h1>
              <p>اشتري أو بيع عربية مستعملة بسهولة وآمان</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </main>
    </header>
  );
};
