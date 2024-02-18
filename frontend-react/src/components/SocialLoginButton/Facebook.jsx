import React from "react";
import { BiLogoFacebook } from "react-icons/bi";
import FacebookAuth from "react-facebook-auth";

export const Facebook = () => {
  const authenticate = (response) => {
    console.log(response);
  };
  return (
    <FacebookAuth
      appId={process.env.REACT_APP_FACEBOOK_APP_ID }
      callback={authenticate}
      component={MyFacebookButton}
    />
  );
};

const MyFacebookButton = ({ onClick }) => {
  return (
    <div className="icon-container" onClick={onClick}>
      <BiLogoFacebook />
    </div>
  );
};
