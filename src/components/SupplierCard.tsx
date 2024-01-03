import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { ButtonStyle } from "../type";
import CollapseBlock from "./CollapseBlock";
import { CollapseProps } from "antd";

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
    <StyledCard key={key}>
      <CardHeader>Create an Order</CardHeader>
      <CollapseBlock items={items} />
      <div>
        <p>Price</p>
        <p style={{ fontSize: "15px", color: "#505050" }}>
          Available upon a quote
        </p>
      </div>

      <Button
        styleType={ButtonStyle.GRAY}
        text="Request a quote"
        onClick={quoteRequest}
      />
      <Button
        styleType={ButtonStyle.BLUE}
        text="Request a Sample"
        onClick={sampleRequest}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  min-height: 250px;
  min-width: 300px;

  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);
  box-sizing: border-box;
  padding: 15px;
`;

const CardHeader = styled.h2``;
export default SupplierCard;
