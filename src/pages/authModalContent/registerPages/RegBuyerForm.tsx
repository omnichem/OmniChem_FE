import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

interface RegBuyerFormProps {
  submitBuyerRegister: () => void;
  loginButton: () => void;
}

export const RegBuyerForm: React.FC<RegBuyerFormProps> = ({ submitBuyerRegister, loginButton }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form name="normal_login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item
        label="Login покупателя"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите login покупателя' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login покупателя" />
      </Form.Item>
      <Form.Item
        label="Пароль поставщика"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль покупателя' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль покупателя"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Забыл пароль
        </a>
      </Form.Item>

      <Form.Item>
        <Button onSubmit={submitBuyerRegister} type="primary" htmlType="submit" className="login-form-button">
          Зарегистрироваться
        </Button>
        Уже зарегистрированы?
        <Button onClick={loginButton}>Войти сейчас!</Button>
      </Form.Item>
    </Form>
  );
};
