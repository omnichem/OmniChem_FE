import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Alert, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { http } from '../../../shared/const/http';
import { useAuth } from '../../../contexts/authContext';
import { PHONE_REGEX } from '../../../shared/utils';

const { Title } = Typography;

type UserProfileData = {
  id: number;
  email: string;
  name: string;
  phone_numbers: { id: number; phone_number: string; verified: boolean }[];
};

export const UserProfile: React.FC = () => {
  const { isLoading, setIsLoading } = useAuth();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await http.get<UserProfileData>('/api/auth/users/me/');
        setUserData(response.data);
        form.setFieldsValue({
          email: response.data.email,
          name: response.data.name,
          phoneNumber: response.data.phone_numbers[0]?.phone_number,
        });
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [form, setIsLoading]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await http.put('/api/auth/users/me/', {
        email: values.email,
        name: values.name,
        phone_numbers: [{ phone_number: values.phoneNumber }],
      });
      setUserData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to update user data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SpinWrapper>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large"></Spin>
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }


  return (
<FormWrapper>
  <Title level={2}>Профиль пользователя</Title>
  {error && <Alert type="error" message={error} />}
  <Form form={form} layout="vertical" onFinish={handleSubmit}>
    <Form.Item
      label="Email"
      name="email"
    >
      <ReadOnlyInput readOnly />
    </Form.Item>
    <Form.Item
      label="Полное имя"
      name="name"
      rules={[{ required: true, message: 'Пожалуйста, укажите фамилию и имя' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Телефон"
      name="phoneNumber"
      rules={[
        { required: true, message: 'Укажите номер телефона' },
        {
          pattern: PHONE_REGEX,
          message: 'Введите действительный номер телефона',
        },
        {
          max: 15,
          message: 'Номер телефона не должен превышать 15 символов',
        },
      ]}
    >
      <Input 
        placeholder="+79992223322"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form.Item>
  </Form>
</FormWrapper>

  );
};

const SpinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  height: 260px;
  outline: 3px dashed;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`;

const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0;
  color: rgba(0, 0, 0, 0.65);
  cursor: not-allowed;
`;