import { FaCarSide } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { GiDreamCatcher } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { BiCar, BiHome, BiQuestionMark } from "react-icons/bi";

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

export const staticLinks = [
  { title: "الرئيسيه", link: "", Icon: BiHome },
  { title: "شراء عربيه", link: "buy-car", Icon: BiCar },
  { title: "بيع عربيه", link: "sell-car", Icon: FaCarSide },
  { title: "اسئله شائعه", link: "questions", Icon: BiQuestionMark },
];
