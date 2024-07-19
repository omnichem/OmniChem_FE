import { LoadingOutlined, UserOutlined, SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Spin, Select, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { AuthFormWrapper } from '../../../pages/authModalForm/AuthForm';
import styled from 'styled-components';
import { useCompany } from '../../../contexts/companyContext';
import { http } from '../../../shared/const/http';
import { notification } from 'antd';

const orgStructure = [
  { id: 1, structure: 'ООО' },
  { id: 2, structure: 'ОАО' },
  { id: 3, structure: 'ЗАО' },
  { id: 4, structure: 'ПАО' },
  { id: 5, structure: 'ИП' },
];

export const RegCompanyForm: React.FC = () => {
  const { registerCompany, updateCompany, companyContextError, isLoading, fetchUserData, userCompanies } = useCompany();
  const [form] = Form.useForm();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const INN_REGEX = /^(\d{10}|\d{12})$/;
  const [showBtn, setShowBtn] = useState('none');

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getData = async () => {
    const { data } = await http.get('/api/auth/users/me/');
    return data;
  };
  getData()
    .then(data => {
      if (!data.admin_companies[0].is_supplier) {
        setShowBtn('inline-block');
      } else {
        setShowBtn('none');
      }
    })
    .catch(() => console.log('Что-то не так'));

  useEffect(() => {
    if (userCompanies.length > 0) {
      const lastCompany = userCompanies[userCompanies.length - 1];
      const companyType = orgStructure.find(item => item.id === lastCompany.company_type)?.structure;
      form.setFieldsValue({
        inn: lastCompany.inn,
        companyType: companyType,
        companyName: lastCompany.company_name,
        address: lastCompany.address,
        position: lastCompany.administrators[0].position,
      });
      setIsEdit(true);
      setCompanyId(lastCompany.id);
    } else {
      form.resetFields();
    }
  }, [userCompanies, form]);

  const handleFormChange = () => {
    const { inn, companyType, companyName, address } = form.getFieldsValue();
    setFormIsValid(!!inn && !!companyType && !!companyName && !!address);
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const companyType = orgStructure.find(item => item.structure === values.companyType)?.id;
    const data = { ...values, companyType };
    if (formIsValid) {
      if (isEdit && companyId) {
        await updateCompany(companyId, data);
      } else {
        await registerCompany(data);
      }
    }
  };

  const [api, contextHolder] = notification.useNotification();

  const openBadNotification = () => {
    api.open({
      message: 'Ваш запрос уже принят. Пожалуйста, подождите и мы с вами свяжемся',
      description: '',
      icon: <MehOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const openErrorNotification = () => {
    api.open({
      message: 'Неизвестная ошибка',
      description: '',
      icon: <FrownOutlined style={{ color: '#222' }} />,
    });
  };

  const openSuccessNotification = () => {
    api.open({
      message: 'Ваш запрос успешно отправлен',
      description: '',
      icon: <SmileOutlined style={{ color: '#1DB5A6' }} />,
    });
  };

  const becomeSupplier = async () => {
    try {
      console.log('id===', companyId)
      await http
        .post('/api/suppliers/registration/', {
          id: companyId,
        })
        .then(response => {
          console.log('Успех:', response);
          openSuccessNotification();
        });
    } catch (err: any) {
      console.error('Упс! Что-то пошло не так. Попробуйте ещё раз', err);
      if (`${err.response.status}` === '400') {
        openBadNotification();
      } else {
        openErrorNotification();
      }
    }
  };

  if (isLoading) {
    return (
      <SpinWrapper vertical gap={30} justify="center" align="center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} size="large" />
        <Alert message="Проверяем данные..." description="Пожалуйста, подождите." type="info" />
      </SpinWrapper>
    );
  }

  return (
    <AuthFormWrapper vertical gap={10}>
      {contextHolder}
      {companyContextError && <Alert type="warning" message="Ошибка" key="Не удалось сохранить" />}
      <Form
        form={form}
        className="supplierDetailForm"
        layout="vertical"
        onValuesChange={handleFormChange}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Краткое наименование"
          name="companyName"
          required={true}
          tooltip="Введите юридическое наименование вашей компании"
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="companyNameInput"
            placeholder="Введите краткое наименование компании"
          />
        </Form.Item>
        <Form.Item label="Организационная форма" name="companyType" required={true} hasFeedback>
          <Select className="companyNameInput" placeholder="Например ООО">
            {orgStructure.map(item => (
              <Select.Option value={item.structure} key={item.structure}>
                {item.structure}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="ИНН"
          name="inn"
          tooltip="ИНН содержит 10 или 12 цифр в зависимости от организационной формы ЮЛ"
          required={true}
          rules={[
            {
              validator: (_, value) => {
                if (!INN_REGEX.test(value)) {
                  return Promise.reject('ИНН должен содержать 10 или 12 символов');
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            className="detailsInput"
            maxLength={12}
            placeholder="Укажите ИНН вашей компании"
            type="text"
            pattern="[0-9]*"
            title="Пожалуйста, введите только цифры"
          />
        </Form.Item>
        <Form.Item
          label="Юр. адрес"
          name="address"
          required={true}
          tooltip="Юридический адрес по которому зарегистрировано юридическое лицо"
          hasFeedback
        >
          <Input className="companyNameInput" placeholder="Введите юридический адрес компании" />
        </Form.Item>
        <Form.Item
          label="Ваша должность"
          name="position"
          required={true}
          tooltip="Укажите вашу должность в компании"
          hasFeedback
        >
          <Input className="detailsInput" placeholder="Ваша должность в компании" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!formIsValid}>
            {isEdit ? 'Сохранить' : 'Зарегистрировать'}
          </Button>
          <Button
            type="primary"
            htmlType="button"
            style={{ marginLeft: '10px', display: showBtn }}
            onClick={becomeSupplier}
          >
            Стать поставщиком
          </Button>
        </Form.Item>
      </Form>
    </AuthFormWrapper>
  );
};

const SpinWrapper = styled(Flex)`
  height: 260px;
  outline: 3px dashed;
  border-radius: 8px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
`;
