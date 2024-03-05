import React from 'react'
import './industryCard.css';

import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';
import img10 from './images/10.png';
import img11 from './images/11.png';
import img12 from './images/12.png';

const IndustryCard = () => {
  return (
    <div className="card">

        <div className="gridCard-container">

            <div className="gridCard-items">
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img1} alt="Косметика" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span className="gridCard-title">Косметическая промышленность</span></a>
                </div>
                <div className="gridCard-item">
                        <img className="gridCard-img" src={img2} alt="Фарма" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span className="gridCard-title">Фармацевтика</span></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img3} alt="Бытовая химия" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Бытовая химия</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img4} alt="Красители" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Краски и красители</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img5} alt="Продукты и БАД-ы" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Продукты и БАД</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img6} alt="Сельское хозяйство" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Сельское хозяйство</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img7} alt="Строительство" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title" >Строительство</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img8} alt="Энергетика" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Энергетика</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img9} alt="Текстильная промышленность" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Текстильная промышленность</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img10} alt="Машиностроение" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title">Машиностроение</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img11} alt="Фотоэлементы" />
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span  className="gridCard-title" >Фотоэлементы</span ></a>
                </div>
                <div className="gridCard-item">
                    <img className="gridCard-img" src={img12} alt="Электротехника"/>
                    <a className="gridCard-item__link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer"><span className="gridCard-title">Электроника и электротехника</span ></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IndustryCard;
