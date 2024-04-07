import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router';
import { CustomHeader } from '../header';

export const HeaderLayout = () => {
  return (
    <Flex vertical>
      <CustomHeader />
      <Layout>
        <Outlet />
      </Layout>
    </Flex>
  );
};
