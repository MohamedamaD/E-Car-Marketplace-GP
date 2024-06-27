import { FaCarSide } from "react-icons/fa";
import { navLinks, staticLinks } from "../constants";
import {
  AddCarToShowroom,
  AddShowroom,
  EditShowroom,
  EditShowrooms,
  SellCar,
  SellerDashboard,
  ShowroomOwner,
  ShowroomOwnerDashboard,
  UpdateCar,
  UserCarsView,
  UserProfile,
} from "../pages";
import { BiShow } from "react-icons/bi";

export const getRoutesForUserRole = (userRole) => {
  switch (userRole) {
    case "seller":
      return [
        { path: "/sell-car", component: SellCar },
        { path: "/my-cars", component: UserCarsView },
        { path: "/update-car/:id", component: UpdateCar },
        { path: "/user-profile", component: UserProfile },
        { path: "/manage", component: SellerDashboard },
      ];
    case "showroom-owner":
      return [
        { path: "/showroom-owner", component: ShowroomOwner },
        { path: "/add-showroom", component: AddShowroom },
        { path: "/edit-showrooms", component: EditShowrooms },
        { path: "/edit-showroom/:id", component: EditShowroom },
        { path: "/sell-car", component: AddCarToShowroom },
        { path: "/my-cars", component: UserCarsView },
        { path: "/manage", component: ShowroomOwnerDashboard },
      ];
    default:
      return [];
  }
};

export const getLinksForUserRole = (userRole) => {
  switch (userRole) {
    case "seller":
      return [
        { title: "بيع عربيه", link: "sell-car", Icon: FaCarSide },
        ...navLinks,
      ];
    case "showroom-owner":
      return [
        {
          title: "معارضي",
          link: "showroom-owner",
          Icon: BiShow,
        },
        ...navLinks,
      ];

    default:
      return navLinks;
  }
};
export const getBarLinksForUserRole = (userRole) => {
  switch (userRole) {
    case "seller":
      return [
        ...staticLinks,
        { title: "بيع عربيه", link: "sell-car", Icon: FaCarSide },
      ];
    case "showroom-owner":
      return [
        ...staticLinks,
        {
          title: "معارضي",
          link: "showroom-owner",
          Icon: BiShow,
        },
      ];

    default:
      return navLinks;
  }
};
