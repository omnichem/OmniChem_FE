import './companyCardForm.css';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';


const { TextArea } = Input;

function CompanyCard() {

  const url = 'http://localhost:8000/API/v1/commerce/distributors/'

  const sendData = async () => {
    await axios.post(url, {
      inn: inn,
      organization_structure: organization_structure,
      company_name_shortened: company_name_shortened,
      about: about,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  // const sendData = async (url, formData) => {
  //   try {
  //     await axios.post(url, formData);
   
  //   } catch (error) {
  //     message.error(`Ошибка по адресу ${url}, статус ошибки ${error.response.status}`);
  //     throw new Error(`Ошибка по адресу ${url}, статус ошибки ${error.response.status}`);
  //   }
  // };

  // const sendCart = (formData) => {
  //   sendData('/API/v1/commerce/distributors/', formData)
  //     .then(() => {
  //       message.success('Данные успешно отправлены');
  //       resetForm();
  //     })
  //     .catch((error) => {
  //       console.error('Ошибка отправки данных:', error);
  //     });
  // };
//   const resetForm = () => {
//     setInn('');
//     setOrganization_structure('ООО');
//     setCompany_name_shortened('');
//     setAbout('');
// };

  const onFinish = () => {
    sendData();
  };

  const [inn, setInn] = useState('');
  const [organization_structure, setOrganization_structure] = useState('ООО');
  const [company_name_shortened, setCompany_name_shortened] = useState('');
  const [about, setAbout] = useState('');

  return (
    <div className="supplierAccountForm-wrapper">
      <Form className='supplierDetailForm' layout="vertical" onFinish={onFinish}>
        <div className="nameCompany-wrapper">
          <Form.Item label="Краткое наименование" name="companyName">
            <Input className='companyNameInput' placeholder="Введите краткое наименование" value={company_name_shortened} onChange={e => setCompany_name_shortened(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Организационная форма" name="organizationForm">
            <Input className='companyNameInput' placeholder="Например ООО" value={organization_structure} onChange={e => setOrganization_structure(e.target.value)} required />
          </Form.Item>
        </div>
        <Form.Item label="ИНН" name="INN">
          <Input className='detailsInput' placeholder="Укажите ИНН вашей компании" type="number" pattern="[0-9]*" title="Пожалуйста, введите только цифры" value={inn} onChange={e => setInn(e.target.value)} required />
        </Form.Item>
        <Form.Item label="Описание компании" name="companyDescription">
          <TextArea className='detailsInput' style={{ maxHeight: '60px' }} rows={6} maxLength={200} placeholder="Введите описание компании, которое увидят клиенты" value={about} onChange={e => setAbout(e.target.value)} />
        </Form.Item>
        <Button className='supplierFormBtn' type="primary" htmlType="submit"  style={{ width: '100%', maxWidth: '100px' }}>Сохранить</Button>
      </Form>
    </div>
  );
}

export default CompanyCard;