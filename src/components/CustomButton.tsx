import React from "react";

import { Button } from "antd";
import styled from "styled-components";

interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "primary" | "dashed" | "link" | "text" | "default";
  shape?: "default" | "circle" | "round";
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  text,
  shape,
  icon,
  onClick,
  disabled,
  type,
  style,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      shape={shape}
      icon={icon}
      style={style}
    >
      {children}
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CustomButton;
