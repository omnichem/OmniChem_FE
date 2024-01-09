import React from "react";

import CustomButton from "./CustomButton";

import CollapseBlock from "./CollapseBlock";
import { CollapseProps } from "antd";
import CustomCard from "./MaterialCard/CustomCard";
import styled from "styled-components";

interface MaterialCardProps {
  items: CollapseProps["items"];
  sampleRequest: () => void;
  quoteRequest: () => void;
  key: number;
}

const SupplierCard: React.FC<MaterialCardProps> = ({
  items,
  sampleRequest,
  quoteRequest,
  key,
}) => {
  return (
    <CustomCard title="Create an Order" key={key}>
      <CollapseBlock items={items} />
      <div>
        <p>Price</p>
        <p style={{ fontSize: "15px", color: "#505050" }}>
          Available upon a quote
        </p>
      </div>

      <RequestWrapper>
        <CustomButton
          type="default"
          text="Request a quote"
          onClick={quoteRequest}
        />
        <CustomButton
          type="primary"
          text="Request a Sample"
          onClick={sampleRequest}
        />
      </RequestWrapper>
    </CustomCard>
  );
};

const RequestWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  width: 100%;
`;

export default SupplierCard;
