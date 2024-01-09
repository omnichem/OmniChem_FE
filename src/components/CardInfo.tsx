import React from "react";

import styled, { css } from "styled-components";
import { CardStyle } from "../type";

interface CardInfoProps {
  styleType: CardStyle;
  children?: React.ReactNode;
}

const CardInfo: React.FC<CardInfoProps> = ({
  children,
  styleType = CardStyle.UN_WRAP,
}) => {
  return <StyledButton $styleType={styleType}>{children}</StyledButton>;
};

const StyledButton = styled.div<{
  $styleType: CardStyle;
}>`
  ${({ $styleType }) => {
    switch ($styleType) {
      case CardStyle.UN_WRAP:
        return css`
          display: flex;
          flex-direction: column;
          gap: 5px;

          padding: 20px;
          height: 150px;

          overflow: hidden;

          transition: 1s;
        `;
      case CardStyle.ROLL_UP:
        return css`
          display: flex;
          flex-direction: column;
          gap: 5px;

          padding: 20px;
          height: auto;

          transition: 1s;
        `;
    }
  }}
`;
export default CardInfo;
