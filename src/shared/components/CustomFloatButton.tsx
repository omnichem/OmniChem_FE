import React from 'react';
import { FloatButton } from 'antd';

interface CustomFloatButtonProps {
  icon: React.ReactNode;
  toolTip: string;
  onClick?: () => void;
}

export const CustomFloatButton: React.FC<CustomFloatButtonProps> = ({ icon, toolTip }) => (
  <FloatButton icon={icon} tooltip={<div>{toolTip}</div>} />
);
