import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { BiLogoGoogle } from "react-icons/bi";
import { setToken } from "../../utils/HelperFunctions";
import {
  fetchUserInfo,
  setGoogleToken,
} from "../../store/slices/authenticationSlice";
import { useDispatch } from "react-redux";

export const Google = () => {
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      setToken(tokenResponse.access_token);
      dispatch(setGoogleToken(true));
    },
  });

  return (
    <div className="icon-container" onClick={() => login()}>
      <BiLogoGoogle />
    </div>
  );
};
