import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

interface RegBuyerFormProps {
  submitBuyerLogin: () => void;
  registerButton: () => void;
}

export const LogSupplierForm: React.FC<RegBuyerFormProps> = ({ submitBuyerLogin, registerButton }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form name="normal_login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item
        label="Login поставщика"
        required
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите имя поставщика' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login поставщика" />
      </Form.Item>
      <Form.Item
        label="Пароль поставщика"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль поставщика' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль поставщика"
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
        <Button onSubmit={submitBuyerLogin} type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        Ещё не зарегистрированы?
        <Button onClick={registerButton}>Зарегистрироваться сейчас!</Button>
      </Form.Item>
    </Form>
  );
};
