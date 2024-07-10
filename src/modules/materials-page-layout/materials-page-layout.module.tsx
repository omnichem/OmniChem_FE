import { Flex } from 'antd';
import { Pagination } from '../pagination';
import { FilterList } from '../filter-list';
import { MaterialList } from '../material-list';
import '../../modules/pagination/styles/customPaginationStyle.css';
import styled from 'styled-components';

export const MaterialsPageLayout = () => {
  return (
    <MaterialsPageWrapper vertical gap={20} justify="center">
      <PaginationWrapper justify="center">
        <Pagination />
      </PaginationWrapper>

      <Flex gap={20} style={{ boxSizing: 'border-box', padding: '0 20px' }}>
        <FilterListWrapper vertical>
          <div style={{ zIndex: '15' }}>
            <FilterList />
          </div>
        </FilterListWrapper>
        <ListWrapper>
          <MaterialList />
        </ListWrapper>
      </Flex>
      <Fotter justify="center" align="center">
        <p>OmniChem ©{new Date().getFullYear()}</p>
      </Fotter>
    </MaterialsPageWrapper>
  );
};

const MaterialsPageWrapper = styled(Flex)`
  box-sizing: border-box;
`;

const FilterListWrapper = styled(Flex)`
  position: sticky;
  z-index: 11;
  top: 153;
  flex: 1;
  @media (max-width: 700px) {
    display: none;
  }
`;

const SortListWrapper = styled.div`
  position: relative;
  height: 100%;
  z-index: 11;
  margin-top: 20px;
  top: 10px;
  flex: 1;
  @media (max-width: 700px) {
    display: none;
  }
`;

const ListWrapper = styled(Flex)`
  flex: 5;
`;

const PaginationWrapper = styled(Flex)`
  position: sticky;
  top: 20px;
  z-index: 10;
  margin-top: 20px;
`;

const Fotter = styled(Flex)`
  height: 60px;
  background-color: #ffffff;
`;
