import { SearchOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Popover, Avatar, Modal, Form, Input, notification, Button } from 'antd';
import type { InputRef } from 'antd';
import { CheckOutlined, CloseOutlined, QuestionOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/authContext';
import { useGlobalSearch } from '../../contexts/globalSearchContext';
import { AuthForm } from '../../pages/authModalForm/AuthForm';
import { CustomButton, Logo, CustomInput } from '../../shared/components';
import { CustomModal } from '../../shared/components/CustomModal';
import styled from 'styled-components';
import Marquee from 'react-double-marquee';

interface ControlButtonsProps {
  isAuthorized: boolean;
  location: any;
  clickAuthButton: () => void;
  clickReturnButton: () => void;
  content: React.ReactNode;
}

interface RunningStringProps {
  clickQuestionButton: () => void;
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

export const CustomHeader: React.FC = () => {
  const { isAuthorized, logOut } = useAuth();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);

  const icons: { success: JSX.Element; failure: JSX.Element; info: JSX.Element } = {
    success: <CheckOutlined style={{ color: 'green' }} />,
    failure: <CloseOutlined style={{ color: 'red' }} />,
    info: <QuestionOutlined style={{ color: 'cyan' }} />,
  };

  const openNotificationWithIcon = (option: JSX.Element, text: string) => {
    notification.open({
      message: (
        <div
          style={{
            color: '#333',
            top: '6px',
          }}
        >
          <p style={{}}>{text}</p>
        </div>
      ),
      icon: option,
      closable: true,
      duration: 3,
      placement: 'top',
    });
  };

  const sendFetch = async () => {
    const data = {
      service_id: 'service_a063nym',
      template_id: 'template_5nbk6hh',
      user_id: 'UjZeaNBxjJr3-EwsD',
      template_params: {
        from_email: `${email}`,
        from_url: `${location.pathname}`,
        textarea: `${message}`,
      },
    };
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      await response;
      console.log('Успех:', response);
      openNotificationWithIcon(icons.success, 'Благодарим за Ваше сообщение. Мы ответим Вам в ближайшее время');
    } catch (error) {
      console.error('Упс! Что-то пошло не так. Попробуйте ещё раз', error);
    }
  };

  const onCreateQuestion = () => {
    setOpen(false);
    setMessage('');
    form.resetFields();
    sendFetch();
  };

  const showModal = () => {
    setOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({
        cursor: 'start',
      });
    }, 100);
  };

  const handleCancel = () => {
    setOpen(false);
    setMessage('');
    form.resetFields();
  };

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

  const clickQuestionButton = () => {
    showModal();
  };

  const text = () => (
    <>
      Мы запустились совсем недавно, если вы нашли ошибку или есть предложение по улучшению — просто{' '}
      <Button
        type="text"
        onClick={clickQuestionButton}
        style={{
          paddingRight: '4px',
          padding: '0',
        }}
      >
        <span
        style={{
          fontSize: '18px',
          textDecoration: 'underline',
          paddingLeft: '10px',
          paddingRight: '4px',
        }}
        >оставьте комментарий</span>
      </Button>
    </>
  );

  const RunningString: React.FC<RunningStringProps> = () => {
    return (
      <div
        style={{
          width: '100vw',
          whiteSpace: 'nowrap',
        }}
      >
        <Marquee direction="left" speed="0.1">
          {text()}&emsp;&emsp;
          <SmileOutlined />
          &emsp;&emsp;
          {text()}&emsp;&nbsp;
          <SmileOutlined />
        </Marquee>
      </div>
    );
  };

  return (
    <>
      <Modal
        open={open}
        title="МЫ ХОТИМ БЫТЬ ЛУЧШЕ"
        okText="Отправить"
        cancelText="Отмена"
        okButtonProps={{ htmlType: 'submit' }}
        onCancel={handleCancel}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ modifier: 'public' }}
            onFinish={() => onCreateQuestion()}
            autoComplete="off"
          >
            {dom}
          </Form>
        )}
      >
        <p>Ваши замечания / наблюдения / рекомендации сделают Omnichem лучшим  ресурсом!</p>
        <br/>
        <p>Если Вам нужна обратная связь, оставьте свой Email</p>
        <Form.Item
          name="email"
          label="Email"
          tooltip="Введите адрес электронной почты"
          rules={[{ type: 'email', required: false, message: 'Укажите корректный email!' }]}
          hasFeedback
        >
          <Input
            name="from_email"
            ref={inputRef}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="textarea" rules={[{ required: true, message: 'А где же сообщение?' }]}>
          <TextArea name="textarea" onChange={e => setMessage(e.target.value)} value={message} rows={5} />
        </Form.Item>
      </Modal>

      <Flex vertical>
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
        <RunningString clickQuestionButton={clickQuestionButton} />
      </Flex>
    </>
  );
};

const StyledHeader = styled(Header)`
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-around;
  // align-items: center;
  align-items: top;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;