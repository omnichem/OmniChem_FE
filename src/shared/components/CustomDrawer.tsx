import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';

interface DivederProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: 'default' | 'large';
  placement?: 'top' | 'right' | 'bottom' | 'left';
  title: string;
}

export const CustomDrawer: React.FC<DivederProps> = ({ open, onClose, children, size, placement, title }) => {
  return (
    <StyledDrawer
      style={{ borderRadius: '10px 0 0 10px' }}
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

const StyledDrawer = styled(Drawer)`
  z-index: 11;
`;
