import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styled from "styled-components";

interface CollapseBlockProps {
  items: CollapseProps["items"];
  ghost?: boolean;
  children?: React.ReactNode;
}

const CollapseBlock: React.FC<CollapseBlockProps> = ({
  items,
  ghost,
  children,
}) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <StyledCollapse items={items} ghost={ghost} onChange={onChange}>
      {children}
    </StyledCollapse>
  );
};

const StyledCollapse = styled(Collapse)`
  width: 100%;
`;

export default CollapseBlock;
