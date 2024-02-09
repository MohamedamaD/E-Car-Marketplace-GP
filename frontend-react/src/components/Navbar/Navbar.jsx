import "./Navbar.scss";
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import { BiMenu, BiUser, BiLogOutCircle } from "react-icons/bi";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.authentication);


  const [sidebarIsActive, setActive] = useState(false);


  return (
    <div className="navbar-container container">
      <Link to="/">
        <div className="brand">
          <img src="" alt="" />
          <h1>اسم الموقع</h1>
        </div>
      </Link>
      <nav className="nav-bar">
        {navLinks.map((navLink, i) => (
          <Link key={navLink.title + i} to={`/${navLink.link}`}>
            {navLink.title}
          </Link>
        ))}
      </nav>

      {sidebarIsActive && (
        <nav className="side-bar">
          <div className="comp">
            <Link to="/">
              <div className="brand">
                <img src="" alt="" />
                <h1>اسم الموقع</h1>
              </div>
            </Link>
            <div className="icon-container" onClick={() => setActive(false)}>
              <BiLogOutCircle />
            </div>
          </div>

          {navLinks.map((navLink, i) => (
            <Link
              key={navLink.title + i}
              className="sidebar-link"
              to={`/${navLink.link}`}
            >
              {navLink.title}
              <div className="icon-container">
                <navLink.Icon />
              </div>
            </Link>
          ))}

          <Link to="/sell-car">
            <Button className="main-bg-color" value="بيع عربيتك" />
          </Link>
          <Link to="/buy-car">
            <Button className="secondary-bg-color" value="اشترى عربية" />
          </Link>
        </nav>
      )}

      <div className="user-profile">
        {isAuthenticated ? (
          <div className="icon-container">
            <BiUser />
          </div>
        ) : (
          <div className="profile-container">
            <Link to="/register">
              <Button value="تسجيل" />
            </Link>
            <div className="icon-container sidebar-toggle">
              <BiMenu onClick={() => setActive(true)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
