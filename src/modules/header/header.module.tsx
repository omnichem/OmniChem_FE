import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Popover, Avatar } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/authContext';
import { useGlobalSearch } from '../../contexts/globalSearchContext';
import { AuthForm } from '../../pages/authModalForm/AuthForm';
import { CustomButton, Logo, CustomInput } from '../../shared/components';
import { CustomModal } from '../../shared/components/CustomModal';
import styled from 'styled-components';

interface ControlButtonsProps {
  isAuthorized: boolean;
  location: any;
  clickAuthButton: () => void;
  clickReturnButton: () => void;
  content: React.ReactNode;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isAuthorized,
  location,
  clickAuthButton,
  clickReturnButton,
  content,
}) => {
  const returnFromPaths = ['/auth', '/profile'];

  if (returnFromPaths.includes(location.pathname)) {
    return <CustomButton text="Вернуться на витрину" type="primary" onClick={clickReturnButton} />;
  }

  if (!isAuthorized) {
    return <CustomButton type="text" text="Войти в систему" onClick={clickAuthButton} />;
  }

  if (isAuthorized) {
    return (
      <Popover content={content} trigger="click">
        <Avatar size={39} icon={<UserOutlined />} />
      </Popover>
    );
  }
};

export const CustomHeader = () => {
  const { isAuthorized, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const clickAuthButton = () => {
    navigate('/auth');
  };

  const clickReturnButton = () => {
    navigate('/');
  };

  return (
    <StyledHeader>
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
        <ControlButtons
          isAuthorized={isAuthorized}
          content={content}
          clickAuthButton={clickAuthButton}
          clickReturnButton={clickReturnButton}
          location={location}
        />
      </Flex>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;
