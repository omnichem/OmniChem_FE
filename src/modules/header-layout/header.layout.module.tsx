import { Flex } from 'antd';
import { Outlet } from 'react-router';
import { CustomHeader } from '../header';
import styled from 'styled-components';

export const HeaderLayout = () => {
  return (
    <Flex vertical>
      <CustomHeader />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Flex>
  );
};

const PageWrapper = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
`;
