import React from "react";
import { useParams } from "react-router-dom";

export const AddressDetails = () => {
  const { address } = useParams();

  return (
    <div>
      <h2>Address Detail of address{address}</h2>
    </div>
  );
};
