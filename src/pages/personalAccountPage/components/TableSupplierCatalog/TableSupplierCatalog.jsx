import React, { useState } from 'react';
import { Table } from 'antd';
import './TableSupplierCatalog.css';

import { columns } from '../accountData';

const TableSupplierCatalog = ({ supplierMaterials, loading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  return <Table rowSelection={rowSelection} columns={columns} dataSource={supplierMaterials} loading={loading} />;
};

export default TableSupplierCatalog;
