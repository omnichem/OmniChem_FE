import './companyCardForm.css'
import AccountInput from "../AccountInput/AccountInput";
import { Button, Form, Input, } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function CompanyCard() {

  const onFormFinish = (e) => {
    console.log(e)
  }
 
  return (
  
    <Form layout="vertical" onFormFinish={onFormFinish}>
    <div className="nameCompany-wrapper">
      <Form.Item label="Краткое наименование" name="companyName">
        <Input placeholderTxt="Введите краткое наименование" required style={{inputFontSize: '16'}}/>
      </Form.Item>
      <Form.Item label="Организационная форма" name="organizationForm">
        <Input  placeholderTxt="Например ООО" required  />
      </Form.Item>
    </div>
      <Form.Item type="number" label="ИНН" name="INN">
        <Input placeholderTxt="Укажите ИНН вашей компании" required pattern="[0-9]*" title="Пожалуйста, введите только цифры"/>
      </Form.Item>
      <Form.Item label="Описание компании" name="companyDiscription">
        <TextArea rows={6} maxLength={200} placeholderTxt="Введите описание компании, которое увидят клиенты" size="small"/>
      </Form.Item>
      <Button type="primary" htmlType="submit">Сохранить</Button>
    </Form>
  )
}

export default CompanyCard;