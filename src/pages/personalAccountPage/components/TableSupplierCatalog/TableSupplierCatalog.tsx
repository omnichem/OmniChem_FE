import { useState } from 'react';
import { Table } from 'antd';
import './TableSupplierCatalog.css';

import { Key } from 'antd/lib/table/interface';
import { Card } from '../../SuppliersAccount';
import { columns } from '../accountData';

interface Props {
  supplierMaterials: Card[] | undefined;
  loading?: boolean;
}

const TableSupplierCatalog: React.FC<Props> = ({ supplierMaterials, loading }) => {
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
      dataSource={supplierMaterials}
      loading={loading}
    />
  );
};

export default TableSupplierCatalog;
