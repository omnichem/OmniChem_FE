import React from "react";
import { Table } from "antd";

import { DataType } from "../types/componentsTypes";
import { TableProps } from "antd/es/table";

interface CustomTableProps {
  size: "large" | "middle" | "small";
  columns: TableProps<DataType>['columns'];
  data: DataType[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ size, columns, data }) => (
  <Table scroll={{ x: 50 }}bordered={true} pagination={false} size={size} columns={columns} dataSource={data} />
);
