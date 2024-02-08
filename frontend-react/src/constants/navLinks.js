import { FaCarSide } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { GiDreamCatcher } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { BiCar } from "react-icons/bi";

export const navLinks = [
  { title: "شراء عربيه", link: "buy-car", Icon: BiCar },
  { title: "بيع عربيه", link: "sell-car", Icon: FaCarSide },
  {
    title: "اقتراحات السيارات",
    link: "recommendation-car",
    Icon: GiDreamCatcher,
  },
  { title: "من نحن", link: "about-us", Icon: BsShop },
  { title: "تواصل معنا", link: "contact-us", Icon: CiCircleQuestion },
];
