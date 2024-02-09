import "./Navbar.scss";
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { BiCar} from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { GiDreamCatcher } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
export const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  return (
    <div className="navbar-container container">
      <Link to="/">
        <div className="brand">
          <img src="" alt="" />
          <h1>اسم الموقع
          </h1>
        </div>
      </Link>
      <nav className="nav-bar">
        {/* TODO [mohamed] : here implement navbar #note follow layout inside tasks/navbar*/}
        {navLinks.map((navLink, i) => (
          <Link key={navLink.title + i} to={`/${navLink.link}`}>
            {navLink.title}
          </Link>
        ))}
      </nav>
      <nav className="side-bar ">
        {/* TODO [somaya] : here implement sidebar  #note follow layout inside tasks/navbar*/
      <div className="comp">
      <h1> 
        اسم الموقع
        <div className="icon-container"><BiLogOutCircle /></div>
      </h1>
      <ul>
        <li>
          <div className="icon-container"><BiCar /></div>
          <span>تصفح كل العربيات</span>
        </li>
        <li>
          <div className="icon-container"><FaCarSide /></div>
          <span>بيع عربيتك</span>
        </li>
        <li>
          <div className="icon-container"><CiCircleQuestion /></div>
          <span>ليه تخترنا</span>
        </li>
        <li>
          <div className="icon-container"><GiDreamCatcher /></div>
          <span>اسئلنا على عريية احلامك</span>
        </li>
        <li>
          <div className="icon-container"><BsShop /></div>
          <span>من نحن</span>
        </li>
      </ul>
            <Button className="btn1" value="بيع عربيتك" />
            <Button className="btn2" value="اشترى عربية" />
         </div>
        
        }
      </nav>
      <div className="user-profile">
        {isAuthenticated ? (
          <div className="icon-container">
            <BiUser />
          </div>
        ) : (
          <Button value="تسجيل" />
        )}
      </div>
    </div>
  );
};
