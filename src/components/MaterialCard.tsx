import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { ButtonStyle, CardStyle } from "../type";
import CardInfo from "./CardInfo";

interface MaterialCardProps {
  manufacturerName: string;
  manufacturerImage?: string;
  manufacturerIcon?: string;
  readyToUseProductType: string;
  compatibleSubstratesAndSurfaces: string;
  features: string;
  chemicalFamily: string;
  description: string;
  materialName: string;
  text: string;
  link: string;

  onClick: () => void;
  styleType: CardStyle;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  onClick,
  styleType,
  manufacturerName,
  manufacturerImage,
  manufacturerIcon,
  materialName,
  readyToUseProductType,
  compatibleSubstratesAndSurfaces,
  features,
  chemicalFamily,
  description,
  text,
  link,
}) => {
  return (
    <StyledCard>
      <CardHeader>
        <ManufacturerImage>{manufacturerImage}</ManufacturerImage>
        <ManufacturerIcon>{manufacturerIcon}</ManufacturerIcon>
      </CardHeader>
      <CardInfo styleType={styleType}>
        <ManufactureName>{manufacturerName}</ManufactureName>
        <MaterialName>{materialName}</MaterialName>
        <div>
          <MaterialDescription style={{ fontWeight: "700" }}>
            Ready to Use Product Type:{readyToUseProductType}
          </MaterialDescription>
        </div>
        <div>
          <MaterialDescription style={{ fontWeight: "700" }}>
            Compatible Substrates & Surfaces:{compatibleSubstratesAndSurfaces}
          </MaterialDescription>
        </div>
        <div>
          <MaterialDescription style={{ fontWeight: "700" }}>
            Features: {features}
          </MaterialDescription>
        </div>
        <div>
          <MaterialDescription style={{ fontWeight: "700" }}>
            Chemical Family: {chemicalFamily}
          </MaterialDescription>
        </div>
        <MaterialDescription>{description}</MaterialDescription>
      </CardInfo>
      <CardFooter>
        <Button text={text} onClick={onClick} styleType={ButtonStyle.GRAY} />
        <Link href={link}>View Product</Link>
      </CardFooter>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  height: auto;
  max-width: 310px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  &:hover {
    background-color: rgb(244, 244, 244);
    transition: 1s;
  }
  &:not(:hover) {
    background-color: rgb(255, 255, 255);
    transition: 1s;
  }
`;

const CardHeader = styled.div`
  height: 120px;
  position: relative;
`;

const ManufacturerImage = styled.div`
  width: 100%;
  height: 90px;

  border-radius: 5px 5px 0 0;
  background-color: #00a99d;
`;

const ManufacturerIcon = styled.div`
  width: 100px;
  height: 100px;

  position: absolute;
  top: 20px;
  left: 20px;

  background-color: #383a3b;
  clip-path: path(
    "M 85.9033 94.638 C 61.0345 96.4547 36.1656 96.4547 11.2998 94.638 C 6.5484 94.2765 2.32561 90.0538 1.96409 85.3026 C 0.147385 60.4345 0.147385 35.5665 1.96409 10.7014 C 2.32561 5.94714 6.5484 1.72448 11.2998 1.36298 C 36.1687 -0.453675 61.0375 -0.453675 85.9033 1.36298 C 90.6547 1.72448 94.8775 5.94714 95.239 10.6984 C 97.0557 35.5665 97.0557 60.4345 95.239 85.2996 C 94.8805 90.0508 90.6547 94.2765 85.9033 94.638 Z"
  );
`;

const ManufactureName = styled.p`
  color: rgb(138, 138, 138);
  margin: 0px 0px -2px;

  font-size: 12px;
  font-weight: 600;
  line-height: 1.33333;
  letter-spacing: 0px;
  -webkit-font-smoothing: antialiased !important;
`;

const MaterialDescription = styled.span`
  color: rgb(138, 138, 138);
  margin: 0px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 14px;
`;

const MaterialName = styled.p`
  color: #222c2e;
  margin: 0;
  font-style: normal;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.375;
  letter-spacing: 0px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #6386a5;
  &:visited {
    color: #383a3b;
  }
`;

export default MaterialCard;
