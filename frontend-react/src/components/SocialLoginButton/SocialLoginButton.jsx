import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

export const SocialLoginButton = ({ providerIcon, googleAuth = false }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  const clickHandler = (ev) => {
    googleAuth ? googleLogin() : console.log(0);
  };
  return (
    <div className="social-login-button" onClick={clickHandler}>
      <div className="icon-container">{providerIcon}</div>
    </div>
  );
};
