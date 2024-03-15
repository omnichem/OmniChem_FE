import React from "react";
import "./marketNumbersBlock.css";

const MarketNumbersBlock = ({ figure, unit, description }) => {
  return (
    <div>
      <div className="marketNumbers-item">
        <div className="marketNumbers-inner">
          <p className="marketNumbers-item__number">{figure}</p>
          <p className="marketNumbers-item__unit">{unit}</p>
          <p className="marketNumbers-item__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketNumbersBlock;
