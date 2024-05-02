import { Logo } from '../../shared/components';
import { Card, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { Auth } from '../auth';

export const AuthLayout = () => {
  return (
    <Flex vertical justify="center" align="center">
      <Logo width={300} height={200} />
      <Title level={2}>Выберите, что вы хотите сделать:</Title>

      <AuthWrapper hoverable>
        <Auth />
      </AuthWrapper>
    </Flex>
  );
};

const AuthWrapper = styled(Card)`
  box-sizing: border-box;
`;
