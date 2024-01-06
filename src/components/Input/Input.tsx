import React from "react";

import styled, { css } from "styled-components";
import { InputStyle } from "../../type";

interface InputProps {
  styleType?: InputStyle;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  styleType = InputStyle.DEFAULT,
  placeholder,
  onChange,
  value,
  children,
  disabled,
  maxLength,
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      $styleType={styleType}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
    >
      {children}
    </StyledInput>
  );
};

const StyledInput = styled.input<{
  $styleType: InputStyle;
}>`
  border: none;
  ${({ $styleType }) => {
    switch ($styleType) {
      case InputStyle.DEFAULT:
        return css`
          border: none;
          border-radius: 5px;
          box-sizing: border-box;
          font-size: 24px;
          line-height: 30px;
          height: 100%;
          width: 100%;
          padding: 0 20px 0 20px;

          &:hover {
          }
          &:focus {
            outline: none;
          }
          &:focus-visible {
            outline: none;
          }
        `;
      case InputStyle.BORDERED:
        return css`
          border: none;
          border-radius: 5px;
          outline: 1px solid #383a3b;
          box-sizing: border-box;
          font-size: 19px;
          line-height: 24px;
          height: 40px;
          width: 100%;
          padding: 0 13px 0 13px;
          &:hover {
          }
          &:focus {
          }
          &:focus-visible {
            outline: 1px solid #6386a5;
          }
        `;
    }
  }}
`;
export default Input;
