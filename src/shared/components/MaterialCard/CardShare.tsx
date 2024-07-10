import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Flex, notification, Button, Tooltip } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined, QuestionOutlined } from '@ant-design/icons';
import type { InputRef, FormInstance } from 'antd';
import envelope from './icons/free-icon-font-envelope.png';
import telegram from './icons/free-icon-font-telegram.png';
import whatsapp from './icons/free-icon-font-whatsapp.png';
import vk from './icons/free-icon-font-vk.png';
import copy from './icons/free-icon-font-copy.png';

import styled from 'styled-components';

interface CardShareProps {
  children?: React.ReactNode;
  value: { open: boolean; closeShare: () => void; materialId: number | undefined };
}

export const CardShare: React.FC<CardShareProps> = prop => {
  const { value } = prop;
  const { open, closeShare, materialId } = value;
  const [email, setEmail] = useState('');
  const [TG, setTG] = useState('');
  const [comment, setComment] = useState('');
  const [showFormEmail, setShowFormEmail] = useState<string>('none');
  const [showFormTG, setShowFormTG] = useState<string>('none');
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);
  const inputRefTG = useRef<InputRef>(null);
  const { TextArea } = Input;

  const urlOmni = 'http://212.233.79.177/';
  const materialLink = `${urlOmni}material/${materialId}`;

  const onFinishShare = () => {
    setComment('');
    form.resetFields();
    setShowFormEmail('none');
    setShowFormTG('none');
    closeShare();
  };

  const closeForm = () => {
    setComment('');
    form.resetFields();
    setShowFormEmail('none');
    setShowFormTG('none');
    setEmail('');
    setTG('');
    closeShare();
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

  const icons: { success: JSX.Element; failure: JSX.Element; info: JSX.Element } = {
    success: <CheckOutlined style={{ color: 'green' }} />,
    failure: <CloseOutlined style={{ color: 'red' }} />,
    info: <QuestionOutlined style={{ color: 'cyan' }} />,
  };

  const sendToEmail = async () => {
    if (email) {
      const data = {
        service_id: 'service_a063nym',
        template_id: 'template_qeompee',
        user_id: 'UjZeaNBxjJr3-EwsD',
        template_params: {
          email: `${email}`,
          materialLink: `${materialLink}`,
          comment: `${comment}`,
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
        openNotificationWithIcon(icons.success, `Ссылка на материал отправлена по адресу ${email}`);
      } catch (error) {
        console.error('Упс! Что-то пошло не так. Попробуйте ещё раз', error);
      }
      closeForm();
    }
  };

  const showInviteTelegram = () => {
    navigator.clipboard.writeText(`Интересное сырье с сайта OmniChem: ${ materialLink}`);
    setShowFormTG('block');
    setShowFormEmail('none');
    setTimeout(() => {
      inputRefTG.current?.focus({
        cursor: 'start',
      });
    }, 100);
  };

  const sendToTG = () => {
    const linkTG = `https://t.me/${TG.substring(1)}`;
    setTimeout(() => {
      window.open(linkTG);
    }, 100);
    closeForm();
  };

  const showInviteEmail = () => {
    setShowFormEmail('block');
    setShowFormTG('none');
    setTimeout(() => {
      inputRef.current?.focus({
        cursor: 'start',
      });
    }, 100);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(materialLink);
    openNotificationWithIcon(icons.success, `Ссылка скопирована`);
    closeForm();
  };

  const tgPattern: RegExp = /^@[A-Za-z\d_]{5,32}$/;

  const [disabledSave, setDisabledSave] = useState(true);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  return (
    <StyledCardShare>
      <Modal
        open={open}
        title="ПОДЕЛИТЬСЯ"
        // okText="Отправить"
        cancelText="Отмена"
        okButtonProps={{ htmlType: 'submit', disabled: disabledSave }}
        onCancel={closeForm}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            initialValues={{ remember: true }}
            onFinish={() => onFinishShare()}
            autoComplete="off"
            onFieldsChange={handleFormChange}
          >
            {dom}
          </Form>
        )}
      >
        <StyledWrap>
          <Flex gap="middle">
            <Tooltip title="Отправить на email">
              <Button style={{ border: 'none' }} onClick={() => showInviteEmail()}>
                <StyledImg src={envelope} />
              </Button>
            </Tooltip>
            <Tooltip title="Telegram">
              <Button style={{ border: 'none' }} onClick={showInviteTelegram}>
                <StyledImg src={telegram} />
              </Button>
            </Tooltip>
            <Tooltip title="Whatsapp">
              <Button style={{ border: 'none' }} onClick={closeForm}>
                <a href={new URL(`?text=${materialLink}`, 'https://api.whatsapp.com/send/').toString()} target="blank">
                  <StyledImg src={whatsapp} />
                </a>
              </Button>
            </Tooltip>
            <Tooltip title="VK">
              <Button style={{ border: 'none' }} onClick={closeForm}>
                <a href={new URL(`https://vk.com/share.php?url=${materialLink}`).toString()} target="blank">
                  <StyledImg src={vk} />
                </a>
              </Button>
            </Tooltip>
            <Tooltip title="Скопировать ссылку">
              <Button style={{ border: 'none' }} onClick={copyToClipboard}>
                <StyledImg src={copy} />
              </Button>
            </Tooltip>
          </Flex>
        </StyledWrap>
        <StyledDivEmail style={{ display: `${showFormEmail}` }}>
          <Form.Item
            name="email"
            label="Введите адрес электронной почты"
            rules={[{ type: 'email', required: true, message: 'Укажите корректный email!' }]}
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
          <Form.Item name="textarea" rules={[{ required: false }]} label="Добавьте комментарий">
            <TextArea name="textarea" onChange={e => setComment(e.target.value)} value={comment} rows={5} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={sendToEmail}
            disabled={!form.isFieldsTouched() || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
          >
            Отправить
          </Button>
        </StyledDivEmail>

        <StyledDivTG style={{ display: `${showFormTG}` }}>
          <p>Ссылка скопирована</p>
          <Form.Item
            name="TG-link"
            label="Введите адрес Telegram"
            rules={[{ pattern: tgPattern, required: true, message: 'Укажите адрес в формате @XXXXX...!' }]}
            hasFeedback
          >
            <Input name="TG-name" ref={inputRefTG} placeholder="@" onChange={e => setTG(e.target.value)} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={sendToTG}
            disabled={!form.isFieldsTouched() || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
          >
            Отправить
          </Button>
        </StyledDivTG>
      </Modal>
    </StyledCardShare>
  );
};

const StyledCardShare = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  max-height: 170px;
  overflow: hidden;
`;
const StyledImg = styled.img`
  width: 20px;
`;
const StyledWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const StyledDivEmail = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 5px;
`;
const StyledDivTG = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 5px;
`;
