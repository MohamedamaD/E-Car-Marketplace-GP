import React from "react";
import "./Home.scss";
import { Header } from "../../containers";

import { Button } from "../../components/Button/Button";
import { images } from "../../constants";
import { Banner } from "../../components/Banner/Banner";
export const Home = () => {
  return (
    <div className="Home">
      <Header />
      <div className="container"></div>
      {/* TODO [somaya] : implement latest cars tasks/home */}

      {
        /* TODO [alaa] : implement how site work section tasks/home */
        <div className="continer1">
          <div className="start">
            <h2 className="main-color">كيف تعمل؟</h2>
            <h5> الطريقة الوحيدة الى تشترى بيها عربيه مستعمله</h5>
          </div>
          <div className="row">
            <div className="fcol">
              <h2>اختار عربيتك المفضله والمعتمده من موقعنا</h2>
              <h5>
                {" "}
                كل عربيتنا تم اختيارها وفحصها وعليها ضمان شامل لمدة 90 يوم
              </h5>
              <h2>اختبر العربيه فى بيتك او فى مركزنا</h2>
              <h5> تاكد من رضاك عن العربية قبل شرائها</h5>
              <h2>ادفع كاش او تقسيط وهنوصلهالك لحد باب البيت</h2>
              <h5>
                من غير نقاش او سؤال ليك الحق انك ترجع العربية وتسترد فلوسك خلال
                7 ايام
              </h5>
              <Button value="اعرف المزيد" />
            </div>
            <div className="fco2">
              <img src={images.CAR_2} alt="car-1" />
            </div>
          </div>
        </div>
      }
      <Banner />
    </div>
  );
};
