import React, { Fragment } from "react";
import "./Home.scss";
import { Header, RecentCars } from "../../containers";
import { Button, Banner, BasicTimeLine } from "../../components";
import { images } from "../../constants";

export const Home = () => {
  const contentText = [
    {
      option: "اختار عربيتك المفضله والمعتمده من موقعنا",
      title: "كل عربيتنا تم اختيارها وفحصها وعليها ضمان شامل لمدة 90 يوم",
    },
    {
      option: "اختبر العربيه فى بيتك او فى مركزنا",
      title: "تاكد من رضاك عن العربية قبل شرائها",
    },
    {
      option: "ادفع كاش او تقسيط وهنوصلهالك لحد باب البيت",
      title:
        "من غير نقاش او سؤال ليك الحق انك ترجع العربية وتسترد فلوسك خلال 7 ايام",
    },
  ];
  return (
    <div className="Home">
      <Header />

      <div className="site-work-container container">
        <div className="start">
          <h2 className="main-color">كيف تعمل؟</h2>
          <h5 className="p-color">
            الطريقة الوحيدة الى تشترى بيها عربيه مستعمله
          </h5>
        </div>
        <div className="">
          <div className="row">
            <div className="col">
              <div className="row-2">
                <div className="time-line">
                  <BasicTimeLine />
                </div>
                <div className="content-container">
                  {contentText.map((content, i) => (
                    <Fragment key={i * i}>
                      <h2>{content.option}</h2>
                      <h5 className="p-color"> {content.title}</h5>
                    </Fragment>
                  ))}
                  <Button value="اعرف المزيد" />
                </div>
              </div>
            </div>
            <div className="col-2">
              <img src={images.CAR_2} alt="car-1" />
            </div>
          </div>
        </div>
      </div>
      <Banner />
      <RecentCars />
    </div>
  );
};
