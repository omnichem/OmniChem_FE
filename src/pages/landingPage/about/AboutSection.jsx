import React from 'react';
import './aboutSection.css';

import bigLogo from './images/bigLogo.png';

const AboutSection = () => {
  return (
    <div className="aboutSection">   
        <div className="aboutSection-wrapper">
            <div className="aboutSection-content">
                <img className="aboutSection-bigLogo" src={bigLogo} alt="цифровая витрина химических материалов" />
                <h2 className="aboutSection-title mainTitle">
                Самый простой способ найти ингридиенты, 
                полимеры и продукты малотоннажной химии. Андрей
                </h2>
                <h3 className="aboutSection-subtitle">
                Более <strong>100 тысяч продуктов</strong> в одном месте 
                </h3>
                    <a className="toCatalogBtn" href="http://212.233.79.177:6688/" target="_blanket" rel="noopener noreferrer"><span>Перейти в каталог</span></a>
            </div> 
            <div className="ellipses-wrapper">
                <div className="ellips1"></div>
                <div className="ellips2"></div>
                <div className="ellips3"></div>
                <div className="ellips4"></div>
                <div className="ellips5"></div>
                <div className="ellips6"></div>
                <div className="ellips7"></div>
                <div className="ellips8"></div>
                <div className="ellips9"></div>
                <div className="ellips10"></div>
                <div className="ellips11"></div>
            </div>
        </div>
    </div>
  )
}

export default AboutSection;
