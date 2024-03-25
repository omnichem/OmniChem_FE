import { Input } from 'antd';
import React, { useState } from 'react';
import { CustomButton, CustomInput } from '../components';
import axios from 'axios';

const testForm = () => {
  const url = '';
  const [value, setValue] = useState('');
  console.log(value);

  const sendData = async () => {
    await axios
      .post(`http://localhost:8000/API/v1/commerce/distributors/`, {
        headers: {
          Authorization: `Bearer ${`Token ${'28ba438a2d543cd3ef9e3b9e80ddce9898756f5c'}`}`,
          // ошибка на 15 строчке
        },
        body: {
          inn: 880055534,
          organization_structure: '2',
          company_name_shortened: 'Ромашка',
          about: 'Компания по производству химического сырья на цветочной основе',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <CustomInput name="" placeholder="" value={value} onChange={setValue} />
      <CustomButton type={'link'} onClick={sendData} text="Отправить" />
    </div>
  );
};

export default testForm;
