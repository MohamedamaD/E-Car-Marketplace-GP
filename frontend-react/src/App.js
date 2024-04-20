import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  BuyCar,
  Home,
  SellCar,
  CarDetails,
  NoPage,
  Contact,
  About,
  UserProfile,
  Recommendation,
  Register,
  MissingInformation,
  Showrooms,
  CommonQuestion,
  ShowroomOwner,
  Showroom,
  UpdateCar,
  UserCarsView,
  AddressDetails,
  Chats,
  EditShowroom,
} from "./pages";
import {
  BottomNavbar,
  Navbar,
  RecommendationResult,
  ScrollToTop,
} from "./components";
import { Footer, MessageAlerts } from "./containers";
import { useDispatch, useSelector } from "react-redux";
import { safeHouse } from "./store/slices/authenticationSlice";
import {
  getBarLinksForUserRole,
  getLinksForUserRole,
  getRoutesForUserRole,
} from "./utils/routeUtils";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const routesForUserRole = getRoutesForUserRole(user?.role);
  const navLinks = getLinksForUserRole(user?.role);
  const barLinks = getBarLinksForUserRole(user?.role);
  useEffect(() => {
    const fetchData = async (req, res) => {
      await dispatch(safeHouse());
    };
    fetchData();
    return () => {};
  }, [dispatch]);

  return (
    <Router>
      <Navbar links={navLinks} />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/buy-car" component={BuyCar} />
        <Route path="/car-details/:id" component={CarDetails} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/recommendation-car" component={Recommendation} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/about-us" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/showrooms" component={Showrooms} />
        <Route path="/showroom/:id" component={Showroom} />
        <Route path="/missing-information" component={MissingInformation} />
        <Route path="/common-question" component={CommonQuestion} />
        <Route path="/chats" component={Chats} />
        <Route path="/recommendation-result" component={RecommendationResult} />

        {routesForUserRole.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} />
        ))}

        <Route path="/update-car/:id" component={UpdateCar} />
        <Route path="/address/:address" component={AddressDetails} />
        <Route path="*" component={NoPage} />
      </Switch>

      <BottomNavbar links={barLinks} />
      <Footer />
      <MessageAlerts />
      <ScrollToTop />
    </Router>
  );
};
export default App;

// important note here we will discuss about new/old car router
// important note here is missing comparison route added in next version
// for this stage those all routes we need
