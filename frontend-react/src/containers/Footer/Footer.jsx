import React from "react";
import "./Footer.scss";
import '../../index.css';
import { Link } from "react-router-dom";
import {Button} from "../../components/Button/Button";
import { MdOutlinePhone } from "react-icons/md";
import { footerlinks } from "../../constants";
export const Footer = () => {
  return (
    <footer>
      <div className="footer-container continer">
        {
        /* TODO [alaa] : implement footer from tasks/footer follow screen sizes */
        <div className="v">
          <div className="f_footer">

            <h2>جاهز لبيع وشراء عربيتك المستعمله معانا ؟</h2>
            <div className="btn">
              <Button className="main-bg-color" value="اشترى عربية" />
              <Button className="secondary-bg-color" value="بيع عربيتك" />
              <Button className="p-bg-color" value="01234">
                <MdOutlinePhone />
              </Button>
              
            </div>

          </div>
        
          <div className="m_footer">
              <div class="footer-column">
                  <h2>عربية الحلم</h2>
                  <p>
                  يحدث برنامجنا طفرة في طريقة بيع و شراء العربيات
                  <br />
                  المستعمله ابتدائا من بيع العربية براحة و امان إلي شراء 
                   <br />
                  عربية مستعملة مضمونة و أسهل من شراء و انتظار عربية جديدة.
                  </p>
                  
              </div>
              <div class="footer-column">
                  <h5>المنتج</h5>
                  <ul>
                      <li><a href="buy-car">الرئيسية</a></li>
                      <li><a href="buy-car">بيع عربيتك</a></li>
                      <li><a href="buy-car">اشترى عربية</a></li>
                      <li><a href="buy-car">ابحث عن عربية حلمك</a></li>
                     
                  </ul>
              </div>
              <div class="footer-column">
                  <h5>الشركة</h5>
                  <ul>
                      <li><a href="buy-car">من نحن</a></li>
                      
                  </ul>
              </div>
              <div class="footer-column">
                  <h5>وسائل التواصل الاجتماعى</h5>
                  <ul>
                      <li><a href="buy-car">لينكد ان</a></li>
                      <li><a href="buy-car">فيسبوك</a></li>
                      <li><a href="buy-car">انستغرام</a></li>
                     
                  </ul>
              </div>
              <div class="footer-column">
                  <h5>قانونى</h5>
                  <ul>
                      <li><a href="buy-car">الشروط والاحكام</a></li>
                      <li><a href="buy-car">سياسة الخصوصية</a></li>
                      
                  </ul>
               </div>
        </div>
      
        <div className="e_footer">

            <p>عربية الحلم كل الحقوق محفوظه 2024 </p>
        
           { footerlinks.map((foot, i) => (
          <Link key={foot.title + i} to={`/${foot.Link}`}>
            <foot.Icon  className="white-bg-color" />
           
          </Link>
        ))}

        </div>

       </div>

        }
      </div>
    </footer>
  );
};
