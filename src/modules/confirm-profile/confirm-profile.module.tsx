import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin, Alert } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const LoadingContent = () => {
  return (
    <>
      <Title>Осталось совсем чуть чуть</Title>
      <Title level={2}>Ваша учетная запись активируется...</Title>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />
    </>
  );
};

const RedirectProcessingContent = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(prev => prev - 1);
      }
      if (timeLeft === 0) {
        navigate('/auth');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, navigate]);

  return (
    <>
      <Title>Ваша учетная запись активирована!</Title>
      <Title level={2}>Через {timeLeft} секунд, вы будете перенаправлены на страницу входа</Title>
      <Title level={3}>
        Вы можете сделать это <Link to={'/auth'}>сейчас</Link>
      </Title>
    </>
  );
};

export const ConfirmProfile = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await axios.post('/api/auth/users/activation/', { "uid": uid, "token": token });
        if (response.status === 204) {
          setLoading(false);
        } else {
          setError('Ошибка активации учетной записи.');
        }
      } catch (error) {
        setError('Ошибка активации учетной записи.');
      }
    };

    if (uid && token) {
      confirmAccount();
    } else {
      setError('Некорректная ссылка для активации.');
    }
  }, [uid, token]);

  if (error) {
    return (
      <Wrapper justify="center" vertical align="center">
        <Title level={2}>{error}</Title>
        <Title level={3}>
          Пожалуйста, попробуйте <Link to={'/auth'}>войти</Link> или <Link to={'/auth/register'}>зарегистрироваться</Link> заново.
        </Title>
      </Wrapper>
    );
  }

  return (
    <Wrapper justify="center" vertical align="center">
      {loading ? <LoadingContent /> : <RedirectProcessingContent />}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  height: calc(100vh - 60px);
`;
