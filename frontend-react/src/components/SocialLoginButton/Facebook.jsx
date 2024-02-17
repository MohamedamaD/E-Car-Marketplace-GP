import React from "react";
import { BiLogoFacebook } from "react-icons/bi";

import FacebookLogin from "react-facebook-login";

export const Facebook = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div className="icon-container">
      <BiLogoFacebook />{" "}
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        callback={responseFacebook}
        render={(renderProps) => (
          <button onClick={renderProps.onClick}>
            This is my custom FB button
          </button>
        )}
      />
    </div>
  );
};

// import FacebookAuth from "react-facebook-auth";

// export const Facebook = () => {
//   const authenticate = (response) => {
//     console.log(response);
//   };
//   return (
//     <FacebookAuth
//       appId="1235"
//       callback={authenticate}
//       component={MyFacebookButton}
//     />
//   );
// };

// const MyFacebookButton = ({ onClick }) => {
//   return (
//     <div className="icon-container" onClick={onClick}>
//       <BiLogoFacebook />
//     </div>
//   );
// };
