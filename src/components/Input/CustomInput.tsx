import React from "react";

import styled, { css } from "styled-components";
import { InputStyle } from "../../type";
import { Input } from "antd";

interface InputProps {
  styleType?: InputStyle;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  addonBefore?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;

  status?: "error" | "warning" | "";
  name: string;
}

const CustomInput: React.FC<InputProps> = ({
  styleType = InputStyle.DEFAULT,
  placeholder,
  onChange,
  value,
  addonBefore,
  disabled,
  maxLength,

  status,
  name,
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      $styleType={styleType}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      addonBefore={addonBefore}
      status={status}
      name={name}
    />
  );
};

const StyledInput = styled(Input)<{
  $styleType: InputStyle;
}>`
  ${({ $styleType }) => {
    switch ($styleType) {
      case InputStyle.DEFAULT:
        return css``;
    }
  }}
`;
export default CustomInput;
