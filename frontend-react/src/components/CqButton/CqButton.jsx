import { Button } from "../../components";
import "../CqButton/CqButton.scss";
import { images } from "../../constants";
import { useState } from "react";

export const CqButton = ({ title, answer }) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  return (
    <main>
      <div className="cq-button">
        <Button
          value={title}
          className={`black-color  btn-title  ${
            isShown ? "no-bottom-red" : ""
          }`}
          onClick={handleClick}
        />
        <img
          className={isShown ? "show" : "hide"}
          src={images.Arrow}
          alt="arrow-icon"
        />
      </div>
      <div className={`ans-cq ${isShown ? "show" : "hide"}`}>
        <p>{answer}</p>
      </div>
    </main>
  );
};
