import React from "react";

import styled, { css } from "styled-components";
import { ButtonStyle } from "../type";

interface ButtonProps {
  styleType: ButtonStyle;
  children?: React.ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  styleType = ButtonStyle.ROUND,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton $styleType={styleType} onClick={onClick} disabled={disabled}>
      {children}
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $styleType: ButtonStyle;
}>`
  border: none;
  ${({ $styleType }) => {
    switch ($styleType) {
      case ButtonStyle.ROUND:
        return css`
          height: 40px;
          width: 70px;
          border-radius: 10px;
          background-color: #6386a5;
          &:hover {
            background-color: #383a3b;
            color: #ffffff;
            transition: 500ms;
          }
          &:not(:hover) {
            transition: 500ms;
          }
        `;
      case ButtonStyle.GRAY:
        return css`
          height: 40px;
          width: 100%;

          outline: 1px solid #6386a5;
          border-radius: 5px;
          background-color: #ffffff;

          padding: 0 10px 0 10px;
          &:hover {
            background-color: rgb(244, 244, 244);
            outline: 1px solid #383a3b;
            transition: 500ms;
          }
          &:not(:hover) {
            transition: 500ms;
          }
          &:focus {
            outline: 1px solid #383a3b;
            transition: 500ms;
            background-color: #383a3b;
            color: #ffffff;
          }
        `;

      case ButtonStyle.BLUE:
        return css`
          height: 40px;
          width: 100%;

          border-radius: 5px;
          color: #ffffff;
          background-color: #00a99d;

          padding: 0 10px 0 10px;
          &:hover {
            background-color: #03beb1;
            transition: 500ms;
          }
          &:not(:hover) {
            transition: 500ms;
          }
          &:disabled {
            background-color: #2f3f3e;
          }
        `;
    }
  }}
`;
export default Button;
