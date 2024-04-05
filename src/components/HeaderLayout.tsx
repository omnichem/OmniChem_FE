import { Avatar, Flex, Layout, Popover } from 'antd';
import { CustomHeader } from './CustomHeader';
import { Logo } from './Logo';
import { CustomInput } from './Input/CustomInput';
import { CustomButton } from './CustomButton';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/authContext';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { CustomModal } from './CustomModal';
import { AuthForm } from '../pages/authModalForm/AuthForm';
import { useGlobalSearch } from '../contexts/globalSearchContext';

export const HeaderLayout = () => {
  const { isAuthorized, logOut } = useAuth();
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsRegModalOpen] = useState(false);
  const [searchMaterial, setSearchMaterial] = useGlobalSearch();

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
    <Layout>
      <CustomModal isModalOpen={isAuthModalOpen} handleModalCancel={() => setIsRegModalOpen(false)}>
        <AuthForm />
      </CustomModal>
      <CustomHeader>
        <Logo height={36} width={170} />
        <CustomInput
          size="large"
          style={{ maxWidth: '600px' }}
          name="searchMaterialInput"
          placeholder="Введите то, что вы хотите найти"
          onChange={setSearchMaterial}
          value={searchMaterial}
          addonBefore={<SearchOutlined />}
        />
        <Flex>
          {isAuthorized ? (
            <>
              <Popover content={content} trigger="click">
                <Avatar size={39} icon={<UserOutlined />} />
              </Popover>
            </>
          ) : (
            <CustomButton type="text" text="Войти в систему" onClick={() => setIsRegModalOpen(true)} />
          )}
        </Flex>
      </CustomHeader>
      <Outlet />
    </Layout>
  );
};
