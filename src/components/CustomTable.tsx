import React from "react";
import { Table } from "antd";

import { DataType } from "../types/componentsTypes";
import { ColumnsType } from "antd/es/table";

interface CustomTableProps {
  size: "large" | "middle" | "small";
  columns: ColumnsType<DataType>;
  data: DataType[];
}

const CustomTable: React.FC<CustomTableProps> = ({ size, columns, data }) => (
  <Table pagination={false} size={size} columns={columns} dataSource={data} />
);

export default CustomTable;
