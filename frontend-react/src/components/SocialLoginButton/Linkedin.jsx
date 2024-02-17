import React from "react";
import { BiLogoLinkedin } from "react-icons/bi";
import { useLinkedIn } from "react-linkedin-login-oauth2";

export const Linkedin = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: "77d7n12zh4vka6",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="icon-container" onClick={linkedInLogin}>
      <BiLogoLinkedin />
    </div>
  );
};
