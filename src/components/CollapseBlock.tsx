import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styled from "styled-components";

interface CollapseBlockProps {
  items: CollapseProps["items"];
}

const CollapseBlock: React.FC<CollapseBlockProps> = ({ items }) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <StyledCollapse items={items} onChange={onChange}></StyledCollapse>;
};

const StyledCollapse = styled(Collapse)`
  width: 100%;
`;

export default CollapseBlock;
