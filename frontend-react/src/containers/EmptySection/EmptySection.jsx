import React from "react";
import "./EmptySection.scss";
import { BiError } from "react-icons/bi";
export const EmptySection = ({ title = "" }) => {
  return (
    <section className="rounded white-bg-color empty-section">
      <BiError className="main-color" />
      <p>{title}</p>
    </section>
  );
};
