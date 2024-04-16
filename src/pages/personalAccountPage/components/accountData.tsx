interface ISAccountData {
  id: number;
  title: string;
  dataIndex: string;
  tags?: boolean;
}

import { Tag } from 'antd';

export const columns: Array<{
  id: number;
  title: string;
  dataIndex: string;
  sorter?: ((a: any, b: any) => number) | undefined;
  render?: ((text: any, record: ISAccountData) => React.ReactNode) | undefined;
}> = [
  {
    id: 1,
    title: 'Наименование сырья',
    dataIndex: 'product_name',
    sorter: (a, b) => {
      const nameA = a.product_name.toUpperCase();
      const nameB = b.product_name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: 2,
    title: 'Производитель',
    dataIndex: 'manufacturer',
  },
  {
    id: 3,
    title: 'Артикул',
    dataIndex: 'article',
  },
  {
    id: 4,
    title: 'Наличие сырья',
    dataIndex: 'availability_status',
  },
  {
    id: 5,
    title: 'Статус сопоставления',
    dataIndex: 'is_relationship',
    render: (_, { tags }) => {
      if (tags) {
        return (
          <Tag color={'green'}>
            <p>Сопоставлено</p>
          </Tag>
        );
      } else {
        return (
          <Tag color={'red'}>
            <p>Не Сопоставлено</p>
          </Tag>
        );
      }
    },
  },
];
