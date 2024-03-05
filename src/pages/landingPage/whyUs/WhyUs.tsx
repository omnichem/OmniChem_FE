import React from 'react'
import './whyUs.css'

import imgFeatures from './images/img.png'
import Features from '../features/Features'

const WhyUs = () => {
  return (
    <div className="whyUs">
        <div className="whyUs-wrapper">
            <div className="whyUs-content">
                <h2 className="whyUs-content-subtitle">Почему omnichem лучшее привычного поиска: </h2>
                <h2 className="mainTitle">Делаем поиск сырья проще</h2>
                <h2 className="whyUs-content-title mainTitle">
                Просматривайте более 100 000 продуктов, находите аналоги, 
                изучайте документацию и базовые технологические карты.</h2>
            </div>
            </div>
            <div className="whyUs-features">
              <div className="whyUs-features__img"><img className="features-img" src={imgFeatures} alt="фон"/></div>
              <div className="whyUs-features__content"><Features /></div>
            </div>
    </div>
  )
}

export default WhyUs
