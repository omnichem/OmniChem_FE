import { TableProps } from 'antd';
import { FilterType } from '../types/componentsTypes';

export const filterColumns: TableProps<FilterType>['columns'] = [
  {
    render: text => <p>{text}</p>,
  },
];
