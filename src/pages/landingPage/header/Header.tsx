import './header.css';

import omnichemLogo from '../logo v3.png'


const Header = () => {
  return (

    <div className="header">
      <div className="header-container">
        <img className="header-logo" src={omnichemLogo} alt="omnichem логотип" />
        <div className="navList" >
          <a className="navList-link" href="/materials" target='_blanket' rel="noopener noreferrer">Для поставщиков</a>
          <a className="navList-link" href="/materials" target='_blanket' rel="noopener noreferrer">Вход</a>
        </div>
      </div>
    </div>
  )
}

export default Header;
