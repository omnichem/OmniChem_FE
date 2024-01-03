import React from "react";
import { Drawer } from "antd";

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
    <Drawer
      title={title}
      placement={placement}
      size={size}
      onClose={onClose}
      open={open}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
