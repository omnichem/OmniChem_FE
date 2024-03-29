import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import styled from 'styled-components';

interface CollapseBlockProps {
  items: CollapseProps['items'];
  ghost?: boolean;
  children?: React.ReactNode;
  collapsible?: 'header' | 'icon' | 'disabled';
}

export const CollapseBlock: React.FC<CollapseBlockProps> = ({ items, ghost, children, collapsible }) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <StyledCollapse collapsible={collapsible} accordion items={items} ghost={ghost} onChange={onChange}>
      {children}
    </StyledCollapse>
  );
};

const StyledCollapse = styled(Collapse)`
  width: 100%;
`;
