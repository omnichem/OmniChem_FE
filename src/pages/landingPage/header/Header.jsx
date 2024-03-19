import './header.css';
import omnichemLogo from '../logo v3.png'
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  return (

    <div className="header">
      <div className='header-container'>
      <div className="header-items">
        <img className="header-logo" src={omnichemLogo} alt="omnichem логотип" />
        <div className="navList" >
          <a className="navList-link" onClick={() => navigate('/materials')} target='_blanket' rel="noopener noreferrer">Вход</a>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Header;