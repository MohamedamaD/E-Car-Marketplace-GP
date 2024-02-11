import React from "react";
import { Button } from "../../components";
import { MdOutlinePhone } from "react-icons/md";
import "./Footer.scss";
import { footerLinks, socialLinks } from "../../constants";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="footer-app">
      <div className="footer-container container">
        <div className="head-footer">
          <h2 className="white-color">
            جاهز لبيع وشراء عربيتك المستعمله معانا ؟
          </h2>
          <div className="button-container">
            <Button className="main-bg-color" value="اشترى عربية" />
            <Button className="secondary-bg-color" value="بيع عربيتك" />
            <Button
              className="white-bg-color secondary-color custom"
              value="01234"
            >
              <MdOutlinePhone />
            </Button>
          </div>
        </div>

        <div className="middle-footer">
          <div className="footer-column footer-title">
            <h5>عربية الحلم</h5>
            <p>
              يحدث برنامجنا طفرة في طريقة بيع و شراء العربيات المستعمله ابتدائا
              من بيع العربية براحة و امان إلي شراء عربية مستعملة مضمونة و أسهل
              من شراء و انتظار عربية جديدة.
            </p>
          </div>

          {footerLinks.map((item, i) => (
            <div className="footer-column" key={i + item.title}>
              <h5>{item.title}</h5>
              <div className="link-container">
                {item.links.map((link, j) => (
                  <Link to={`/${link.link}`} key={link.title + j}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tail-footer">
          <p>عربية الحلم كل الحقوق محفوظه 2024 </p>

          <div className="social-container">
            {socialLinks.map((foot, i) => (
              <Link
                key={foot.title + i}
                className="icon-container"
                to={`/${foot.Link}`}
              >
                <foot.Icon className="white-bg-color" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
