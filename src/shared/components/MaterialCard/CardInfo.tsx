import React from 'react';

import styled, { css } from 'styled-components';
import { CardStyle } from '../../types/componentsTypes';

interface CardInfoProps {
  styleType: CardStyle;
  children?: React.ReactNode;
}

export const CardInfo: React.FC<CardInfoProps> = ({ children, styleType = CardStyle.UN_WRAP }) => {
  return <StyledCardInfo $styleType={styleType}>{children}</StyledCardInfo>;
};

const StyledCardInfo = styled.div<{
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
          max-height: 170px;

          overflow: hidden;
        `;
      case CardStyle.ROLL_UP:
        return css`
          display: flex;
          flex-direction: column;
          gap: 5px;

          padding: 20px;
          height: auto;
          max-height: 250px;
          transition: height 3s;
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
        `;
    }
  }}
`;
