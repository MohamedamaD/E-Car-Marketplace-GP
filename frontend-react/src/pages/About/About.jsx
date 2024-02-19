import React from "react";
import "./About.scss";
import { about_head, about_middle, about_tail, images } from "../../constants";
import { Link } from "react-router-dom";
export const About = () => {
  return (
    <div id="about-page">
      <div className="about-container container">
        <div className="header_container">
          {about_head.map((item, index) => (
            <div
              className={`head ${index % 2 === 0 ? "active" : ""}`}
              key={index + item.headerContent}
            >
              <div className="img-container">
                <img src={item.imageUrl} alt="About" />
              </div>
              <div className="text-container">
                <h1>{item.headerContent}</h1>
                <p>{item.paragraphContent}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="middle-container secondary-bg-color">
          <h1 className="white-color">ما الشىء الذى يجعلنا مميزين ؟</h1>
          <div className="middle">
            {about_middle.map((item, index) => (
              <div className="arrow" key={index + item.content}>
                <div className="ima">
                  <img src={item.imageUrl} alt="About" />
                  <p style={{ color: "white" }}>{item.content}</p>
                </div>
                <div className="arrow_photo">
                  <img src={images.arrow_about} alt="arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tail_container">
          <h1>قيمنا</h1>
          <div className="tail">
            {about_tail.map((item, index) => (
              <div className="text-container" key={index + item.title}>
                <h2 className="number secondary-color">{index + 1}</h2>
                <h2>{item.title}</h2>
                <p className="item-paragraph">{item.paragraph} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
