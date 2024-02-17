import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { BiLogoGoogle } from "react-icons/bi";

export const Google = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className="icon-container" onClick={() => login()}>
      <BiLogoGoogle />
    </div>
  );
};
