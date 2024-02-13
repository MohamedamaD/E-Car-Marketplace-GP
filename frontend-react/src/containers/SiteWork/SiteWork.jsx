import React, { Fragment } from "react";
import { BasicTimeLine, Button, SectionTitle } from "../../components";
import { contentText, images } from "../../constants";
import "./SiteWork.scss";
export const SiteWork = () => {
  return (
    <div className="site-work">
      <div className="site-work-container">
        <SectionTitle
          subTitle="الطريقة الوحيدة الى تشترى بيها عربيه مستعمله"
          title="كيف تعمل؟"
        />
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
    </div>
  );
};
