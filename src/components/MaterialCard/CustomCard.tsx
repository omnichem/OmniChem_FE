import React from "react";
import { Card, Space } from "antd";

interface CustomCardProps {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  children,
  onClick,
}) => (
  <Space direction="vertical" size={16}>
    <Card
      title={title}
      style={{
        width: 300,
        boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16)",
      }}
      onClick={onClick}
    >
      {children}
    </Card>
  </Space>
);

export default CustomCard;
