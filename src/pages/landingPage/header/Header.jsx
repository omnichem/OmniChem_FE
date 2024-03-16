import './header.css';
import { Divider } from 'antd'
import omnichemLogo from '../logo v3.png'

const Header = () => {
  return (

    <div className="header">
      <div className='header-container'>
      <div className="header-items">
        <img className="header-logo" src={omnichemLogo} alt="omnichem логотип" />
        <div className="navList" >
          {/* <a className="navList-link" href="/materials" target='_blanket' rel="noopener noreferrer">Для поставщиков</a> */}
          <a className="navList-link" href="http://212.233.79.177/materials" target='_blanket' rel="noopener noreferrer">Вход</a>
        </div>
      </div>
      <Divider className='divider'/>
      </div>
    </div>
  )
}

export default Header;