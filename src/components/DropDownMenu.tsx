import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Button from "./Button";
import { ButtonStyle } from "../type";
import styled from "styled-components";

interface DropDownMenuProps {
  filterText: string;
  items: MenuProps["items"];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ filterText, items }) => (
  <StyledDropDown menu={{ items }} placement="bottom" arrow>
    <Space>
      <Button text={filterText} styleType={ButtonStyle.GRAY} />
    </Space>
  </StyledDropDown>
);

const StyledDropDown = styled(Dropdown)`
  width: auto;
`;

export default DropDownMenu;
