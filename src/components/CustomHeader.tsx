import { Layout } from 'antd';
import React from 'react';
const { Header } = Layout;

interface HeaderProps {
  children: React.ReactNode;
}

export const CustomHeader: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Header
      style={{
        padding: '10px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        position: 'sticky',
        top: '0',
        zIndex: '10',
        height: 'auto',
        backgroundColor: '#ffffff',
        boxShadow:
          '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
      }}
    >
      {children}
    </Header>
  );
};
