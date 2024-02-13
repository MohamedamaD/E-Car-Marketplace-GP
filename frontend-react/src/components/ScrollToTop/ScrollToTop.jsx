import React, { useEffect, useState } from "react";
import "./ScrollToTop.scss";

import { FaArrowUp } from "react-icons/fa";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`scroll-to-top main-bg-color rounded ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="white-color" />
    </div>
  );
};
