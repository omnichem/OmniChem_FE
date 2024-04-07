import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Popover, Avatar } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/authContext';
import { useGlobalSearch } from '../../contexts/globalSearchContext';
import { AuthForm } from '../../pages/authModalForm/AuthForm';
import { CustomButton, Logo, CustomInput } from '../../shared/components';
import { CustomModal } from '../../shared/components/CustomModal';

export const CustomHeader = () => {
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
    <Header
      style={{
        padding: '10px',
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'sticky',
        top: '0',
        zIndex: '10',
        height: 'auto',
        backgroundColor: '#ffffff',
        boxShadow:
          '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
      }}
    >
      <CustomModal isModalOpen={isAuthModalOpen} handleModalCancel={() => setIsRegModalOpen(false)}>
        <AuthForm />
      </CustomModal>
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
    </Header>
  );
};
