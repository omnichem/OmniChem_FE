import React from 'react';
import './features.css';

import laptop from './images/laptop.jpg';
import cart from './images/cart.jpg'
import checklist from './images/checklist.jpg';
import palette from './images/palette.jpg'
import fileEarmark from './images/fileEarmark.jpg'

const Features = () => {
  return (
    <div className="features">
        <div className="features-block">
            <div className="features-grid">
                <div className="features-item">          
                    <div className="features-icons">
                        <img className="feature-icon" src={laptop} alt="иконка ноутбук" />
                        <img className="feature-cartIcon" src={cart} alt="иконка" />
                    </div>
                    <h2 className="features-title">Мгновенный доступ</h2>
                    <p className="features-description" >
                        Узнайте какие продукты доступны на рынке за одну минуту,
                        без длительного поиска в интернете и обзвона поставщиков.
                    </p>
                </div>
                <div className="features-item">
                    <div className="features-icons"><img className="feature-icon" src={checklist} alt="иконка документация" /></div>
                    <h2 className="features-title">Изучайте документацию</h2>
                    <p className="features-description" >
                        Доступ к технической документации и свойствам продукта, без длительного 
                        общения по телефону или запросам по почте.
                    </p>
                </div>
                <div className="features-item">
                    <div className="features-icons">
                    <img className="feature-icon" src={palette} alt="иконка документация" />
                    <img className="feature-icon" src={fileEarmark} alt="иконка документация" />
                    </div>
                    <h2 className="features-title">Заказывайте образцы и коммерческие предложения</h2>
                    <p className="features-description" >
                        Быстрый заказ образцов для ваших исследований и запрос коммерческих предложений 
                        на необходимое количество сырья. 
                    </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Features
