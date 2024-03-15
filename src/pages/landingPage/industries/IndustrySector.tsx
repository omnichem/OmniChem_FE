import React from "react";
import "./industrySector.css";

import Suppliers from "../suppliers/Suppliers";
import { industryCards, suppliers } from "../data";
import IndustryCard from "../industryCard/IndustryCard";

const IndustrySector = () => {
  return (
    <div className="wrapper">
      <div className="industrySector">
        <div className="industrySector-container">
          <h2 className="mainTitle">Отрасли с которыми мы работаем:</h2>
          <div className="industryCard-items">
            {industryCards.map((industryCard) => (
              <IndustryCard key={industryCard.title} {...industryCard} />
            ))}
          </div>
        </div>
        <div className="industrySector-suppliers">
          <h2 className="supppliers-title">
            Данные о продуктах от мировых лидеров:
          </h2>
          <div className="suppliers-list">
            {suppliers.map((supplier) => (
              <Suppliers key={supplier.name} {...supplier} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySector;
