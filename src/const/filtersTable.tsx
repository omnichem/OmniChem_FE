import { TableProps } from 'antd';
import { DataType, FilterType } from '../types/componentsTypes';

export const filterColumns: TableProps<FilterType>['columns'] = [
  {
    render: text => <p>{text}</p>,
  },
];
