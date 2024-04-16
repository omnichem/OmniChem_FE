import { useState } from 'react';
import { Table } from 'antd';
import './TableSupplierCatalog.css';

import { columns } from '../accountData';
import { Key } from 'antd/lib/table/interface';

interface Props {
  supplierMaterials: any[];
  loading: boolean;
}

const TableSupplierCatalog = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  return (
    <Table
      className="table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={props.supplierMaterials}
      loading={props.loading}
    />
  );
};

export default TableSupplierCatalog;
