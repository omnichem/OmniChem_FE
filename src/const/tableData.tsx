import { TableProps } from 'antd';
import { DataType } from '../types/componentsTypes';

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Название характеристики',
    dataIndex: 'name',
    key: 'name',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Единица измерения',
    dataIndex: 'unit',
    key: 'unit',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Метод тестирования',
    key: 'method',
    dataIndex: 'method',
    render: text => <p>{text}</p>,
  },
];
