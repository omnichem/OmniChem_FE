import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import Title from 'antd/es/typography/Title';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoadingContent = () => {
  return (
    <>
      <Title>Осталось совсем чуть чуть</Title>
      <Title level={2}>Ваша учетная запись активируется...</Title>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />
    </>
  );
};

const RedirectPrecessingContent = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(prev => prev - 1);
        console.log(timeLeft);
      }
      if (timeLeft == 0) {
        navigate('/');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <>
      <Title>Ваша учетная запись активирована!</Title>
      <Title level={2}>Через {timeLeft} секунд, вы будете перенаправлены на страницу входа</Title>
      <Title level={3}>
        Вы можете сделать это <Link to={'/'}>сейчас</Link>
      </Title>
    </>
  );
};

export const ConfirmProfile = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Wrapper justify="center" vertical align="center">
      {loading ? <LoadingContent /> : <RedirectPrecessingContent />}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  height: calc(100vh - 60px);
`;
