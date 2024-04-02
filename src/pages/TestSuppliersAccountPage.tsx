import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Popover, Avatar, Flex } from 'antd';
import { Logo, CustomInput, CustomButton } from '../components';
import { CustomHeader } from '../components/CustomHeader';
import { AuthContainer } from './MaterialCardsPage';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/authContext';

const TestSuppliersAccountPage = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const content = (
    <Flex vertical>
      <CustomButton
        style={{ flexBasis: 'flexStart' }}
        type="text"
        text="Профиль"
        onClick={() => navigate('/profile')}
      />
      <CustomButton type="text" text="Выйти из системы" onClick={logOut} />
    </Flex>
  );
  return (
    <CustomHeader>
      <Logo height={36} width={170} />
      <AuthContainer>
        <Popover content={content} trigger="click">
          <Avatar size={39} icon={<UserOutlined />} />
        </Popover>
      </AuthContainer>
    </CustomHeader>
  );
};

export default TestSuppliersAccountPage;
