import { Flex } from 'antd';
import { Pagination } from '../pagination';
import { FilterList } from '../filter-list';
import { MaterialList } from '../material-list';

export const MaterialsPageLayout = () => {
  return (
    <Flex vertical gap={20} style={{ overflowY: 'scroll', height: '91vh', paddingTop: '20px' }}>
      <Pagination />
      <Flex gap={20} style={{ padding: '0 20px 20px 20px', boxSizing: 'border-box' }}>
        <FilterList />
        <MaterialList />
      </Flex>
    </Flex>
  );
};
