import React from 'react'

import { useNavigate } from 'react-router';
import CustomButton from '../../../components/CustomButton';

const RegisterSelectionPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{display: "flex", gap: "20px", height: "100vh", alignItems: "center", justifyContent: "center"}}>
      <h2>Register Role Selection Page</h2>
      <CustomButton type='primary' text='Зарегистрироваться как поставщик' onClick={()=> navigate('/customer-register')}/>
      <CustomButton type='primary' text='Заркгистрироваться как Покупатель' onClick={()=> navigate('/supplier-register')}/>
    </div>
  )
}

export default RegisterSelectionPage