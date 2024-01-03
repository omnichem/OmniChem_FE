import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Button from "./Button";
import { ButtonStyle } from "../type";

interface DropDownMenuProps {
  filterText: string;
  items: MenuProps["items"];
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ filterText, items }) => (
  <Dropdown menu={{ items }} placement="bottom" arrow>
    <Space>
      <Button text={filterText} styleType={ButtonStyle.GRAY} />
    </Space>
  </Dropdown>
);

export default DropDownMenu;
