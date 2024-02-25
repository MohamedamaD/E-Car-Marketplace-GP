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
} from "./pages";
import { BottomNavbar, Navbar, ScrollToTop } from "./components";
import { Footer, MessageAlerts } from "./containers";
import { useDispatch } from "react-redux";
import { safeHouse } from "./store/slices/authenticationSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (req, res) => {
      await dispatch(safeHouse());
    };
    fetchData();
    return () => {};
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/buy-car" component={BuyCar} />
        <Route path="/sell-car" component={SellCar} />
        <Route path="/car-details/:id" component={CarDetails} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/missing-information" component={MissingInformation} />
        <Route path="/recommendation-car" component={Recommendation} />
        <Route path="/common-question" component={CommonQuestion} />
        <Route path="/showrooms" component={Showrooms} />
        <Route path="/showroom-owner" component={ShowroomOwner} />
        <Route path="/showroom/:id" component={Showroom} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/about-us" component={About} />
        <Route path="/register" component={Register} />
        <Route path="*" component={NoPage} />
      </Switch>

      <BottomNavbar />
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
