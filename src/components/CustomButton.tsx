import React from "react";

import { Button } from "antd";

interface ButtonProps {
  children?: React.ReactNode;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "primary" | "dashed" | "link" | "text" | "default";
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  text,

  onClick,
  disabled,
  type,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} type={type}>
      {children}
      {text}
    </Button>
  );
};

export default CustomButton;
