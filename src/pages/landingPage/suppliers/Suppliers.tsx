import React from "react";
import "./suppliers.css";

const Suppliers = ({ name, img }) => {
  return (
    <div className="suppliers-item">
      <a
        className="suppliers-link"
        href="#"
        target="_blanket"
        rel="noopener noreferrer"
      >
        <img className="suppliers-logo" src={img} alt={name} />
      </a>
    </div>
  );
};

export default Suppliers;
