import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import CustomButton from "./CustomButton";

import styled from "styled-components";

interface DropDownMenuProps {
  filterText: string;
  items: MenuProps["items"];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ filterText, items }) => (
  <StyledDropDown
    className="dropDown"
    menu={{ items }}
    placement="bottom"
    arrow
  >
    <Space>
      <CustomButton type="default" text={filterText} />
    </Space>
  </StyledDropDown>
);

const StyledDropDown = styled(Dropdown)`
  width: auto;
`;

export default DropDownMenu;
