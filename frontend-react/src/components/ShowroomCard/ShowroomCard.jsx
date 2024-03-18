import React from "react";
import "./ShowroomCard.scss";
import { BiCircle, BiPhone, BiX } from "react-icons/bi";
import { deleteShowroom } from "../../store/slices/showroomOwnerSlice";
import { useDispatch } from "react-redux";
import { isFulfilled } from "../../utils";
import { useHistory } from "react-router-dom";
import { LocationCard } from "../LocationCard/LocationCard";

export const ShowroomCard = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="showroom-card">
      <div className="showroom-card-container">
        <details>
          <summary className="showroom-name">معرض {props?.name}</summary>
          {props?.locations.map((item) => (
            <LocationCard props={item} key={item?._id} />
          ))}
        </details>
      </div>
    </div>
  );
};
