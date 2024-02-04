import { useNavigate } from 'react-router';
import CustomButton from '../../../components/CustomButton';

const LoginSelectionPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{display: "flex", gap: "20px", height: "100vh", alignItems: "center", justifyContent: "center"}}>
      <h2>Login Role Selection Page</h2>
      <CustomButton type='primary' text='Войти как поставщик' onClick={()=> navigate('/customer-login')}/>
      <CustomButton type='primary' text='Войти как Покупатель' onClick={()=> navigate('/supplier-login')}/>
    </div>
  )
}

export default LoginSelectionPage