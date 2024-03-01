import React from "react";
import { useParams } from "react-router-dom";

const AddressDetails = () => {
  const { address } = useParams();

  return (
    <div>
      <h2>Address Detail of address{address}</h2>
    </div>
  );
};

export default AddressDetails;
