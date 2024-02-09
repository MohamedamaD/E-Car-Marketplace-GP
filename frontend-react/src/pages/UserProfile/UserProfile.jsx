import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "../../containers";

export const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="container user-container">
        <div className="options">
          <nav></nav>
        </div>
        <div className="content">
          {/* <Switch>
            <Route path="setting" component={Header} />
          </Switch> */}
        </div>
      </div>
    </div>
  );
};
