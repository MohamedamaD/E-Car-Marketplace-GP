import { BiCog, BiInfoCircle, BiUserCircle } from "react-icons/bi";

export const UserLinks = [
  {
    Icon: <BiInfoCircle />,
    title: "استكمال البيانات",
    link: "/user-information",
  },
  {
    Icon: <BiCog />,
    title: "الاعدادات",
    link: "/settings",
  },
  {
    Icon: <BiUserCircle />,
    title: "الملف الشخصي",
    link: "/user-profile",
  },
];
