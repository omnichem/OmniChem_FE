import React from 'react';
import './footer.css';

import omniLogo from '../logo v3.png';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-container__items">
                    <p className="footer-container__title">Для покупателей</p>
                    <p className="footer-container__item">Обзор возможностей</p>
                    <p className="footer-container__item">Преимущества</p>
                    <p className="footer-container__item">Расширенные возможности</p>
                    <img className="omni-logo" src={omniLogo} alt="omnichem logo" />
                </div>
                <div className="footer-container__items">
                    <p className="footer-container__title">Для поставщиков</p>
                    <p className="footer-container__item">Обзор возможностей</p>
                    <p className="footer-container__item">Преимущества для производителей</p>
                </div>
                <div className="footer-container__items">
                    <p className="footer-container__title">О компании</p>
                    <p className="footer-container__item">Миссия компании</p> 
                    <p className="footer-container__item">Наши ценности</p> 
                    <p className="footer-container__item">Вакансии</p> 
                    <p className="footer-container__item">Ивесторам и партнерам</p> 
                </div>
            </div>
            <div className="footer-copyright">
                <p className="copyright">© omnichem.ru 2023</p>
                <p className="copyright">Политика обработки данных | Cookies</p>
            </div>
        </div>
        
    </div>
  )
}

export default Footer;
