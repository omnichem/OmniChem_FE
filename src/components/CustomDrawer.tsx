import React from "react";
import { Drawer } from "antd";
import styled from "styled-components";

interface DivederProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: "default" | "large";
  placement: "top" | "right" | "bottom" | "left";
  title: string;
}

const CustomDrawer: React.FC<DivederProps> = ({
  open,
  onClose,
  children,
  size,
  placement,
  title,
}) => {
  return (
    <StyledDrawer
      title={title}
      placement={placement}
      size={size}
      onClose={onClose}
      open={open}
    >
      {children}
    </StyledDrawer>
  );
};

const StyledDrawer = styled(Drawer)``;

export default CustomDrawer;
