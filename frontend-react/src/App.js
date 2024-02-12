import React from "react";
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
  Loading,
  CommonQuestion,
} from "./pages";
import { BottomNavbar, Navbar } from "./components";
import { Footer } from "./containers";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/buy-car" component={BuyCar} />
        <Route path="/sell-car" component={SellCar} />
        <Route path="/car-details:id" component={CarDetails} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/recommendation-car" component={Recommendation} />
        <Route path="/common-question" component={CommonQuestion} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/about-us" component={About} />
        <Route path="/register" component={Register} />
        <Route path="*" component={NoPage} />
      </Switch>
      <BottomNavbar />
      <Footer />
    </Router>
  );
};
export default App;

// important note here we will discuss about new/old car router
// important note here is missing comparison route added in next version
// for this stage those all routes we need
