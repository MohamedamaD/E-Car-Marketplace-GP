import { CiCircleQuestion } from "react-icons/ci";
import { GiDreamCatcher } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import {
  BiCar,
  BiChat,
  BiHome,
  BiQuestionMark,
  BiSolidInvader,
} from "react-icons/bi";

export const navLinks = [
  { title: "شراء عربيه", link: "buy-car", Icon: BiCar },
  { title: "تسوق المعارض", link: "showrooms", Icon: BiSolidInvader },
  {
    title: "اقتراحات السيارات",
    link: "recommendation-car",
    Icon: GiDreamCatcher,
  },
  { title: "المراسلات", link: "chats", Icon: BiChat },
  { title: "من نحن", link: "about-us", Icon: BsShop },
  { title: "تواصل معنا", link: "contact-us", Icon: CiCircleQuestion },
  { title: "الاسئله الشائعه", link: "common-question", Icon: BiQuestionMark },
];

export const staticLinks = [
  { title: "الرئيسيه", link: "", Icon: BiHome },
  { title: "شراء عربيه", link: "buy-car", Icon: BiCar },
  { title: "اسئله شائعه", link: "questions", Icon: BiQuestionMark },
];
