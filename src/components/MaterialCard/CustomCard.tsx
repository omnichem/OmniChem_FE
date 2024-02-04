import React from "react";
import { Card } from "antd";

interface CustomCardProps {
  // title: string;
  children: React.ReactNode;
  onClick?: () => void;
  width: number;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, onClick, width }) => (
    <Card
      hoverable={true}
      style={{
        width: width,
      }}
      onClick={onClick}
    >
      {children}
    </Card>
);

export default CustomCard;
