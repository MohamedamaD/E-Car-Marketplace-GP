import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Header.scss";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import hero from "../../assets/hero.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Header = () => {
  const swiperOptions = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay], // You can also remove this line if you don't use modules directly in the Swiper component
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
            {" "}
            <img src={hero} alt="car" className="slider-opacity" />
            <div className="text-overlay">
              <h1>عربيات مستعملة بدون تنازلات!</h1>
              <p>اشتري أو بيع عربية مستعملة بسهولة وآمان</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={hero} alt="car" className="slider-opacity" />
            <div className="text-overlay">
              <h1>عربيات مستعملة بدون تنازلات!</h1>
              <p>اشتري أو بيع عربية مستعملة بسهولة وآمان</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={hero} alt="car" className="slider-opacity" />
            <div className="text-overlay">
              <h1>عربيات مستعملة بدون تنازلات!</h1>
              <p>اشتري أو بيع عربية مستعملة بسهولة وآمان</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={hero} alt="car" className="slider-opacity" />
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
