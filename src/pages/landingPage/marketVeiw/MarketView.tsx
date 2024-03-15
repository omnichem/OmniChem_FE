import './marketView.css'

import ellips21 from './Ellipse 21.png'
import MarketNumbersBlock from '../marketNumbersBlock/MarketNumbersBlock';

const MarketView = () => {
    return (
        <div className="marketView">
            <div className="marketView-wrapper">
                <div className="ellips-block"><img className="Ellipse" src={ellips21} alt="фон" />
                    <div className="marketView-future">
                        <div className="future-Content">
                            <h2 className="future-Content__title">Видим будущее в развитии химической отрасли</h2>
                            <div className="future-Content__inner">
                                <div className="future-Content__leftBlock">
                                    <p className="leftBlock-txt">
                                        Мы в <span className="omnichem"> omnichem </span> уверены, что химическая отрасль это драйвер развития любой другой отрасли.
                                        Мы считаем, что простой и открытый доступ к информации о сырье позволяет вам работать эффективнее
                                        и быстрее, чтобы вы могли разрабатывать новые продукты и улучшать свои бизнес показатели.
                                    </p>
                                </div>
                                <div className="future-Content__rightBlock">
                                    <p className="rightBlock-upTxt">Благодаря вам развивается производство автомобилей и лекарств.
                                        Повышается эффективность сельского хозяйства. Появляются интонационные косметические средства и
                                        биоразлагаемая упаковка. Повышается технологическая независимость и продовольственный суверенитет.
                                        Это лишь малая часть отраслей в развитии которых участвует химия.
                                    </p>
                                    <p className="rightBlock-downTxt">Нам не терпится увидеть, какие еще отрасли начнут развиваться быстрее с
                                        появлением omnichem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marketView-featuresBlock">
                        <h2 className="mainTitle">Рынок химии в России это:</h2>
                        <MarketNumbersBlock />
                    </div>
                </div>


                <div className="marketView-perspectivesBlock">
                    <div className="perspectivesBlock-advantages">
                        <h2 className="perspectivesBlock-advantages__title mainTitle">
                            Это один из самых перспективных рынков благодаря нескольким факторам:
                        </h2>
                        <div className="perspectivesBlock__advantagesList">
                            <p className="perspectivesBlock-advantages__advantageItem">
                                Высокая заинтересованность в развитие рынка со стороны государства и различные меры поддержки.
                            </p>
                            <p className="perspectivesBlock-advantages__advantageItem">Низкий уровень цифровизации, что дает
                                возможности для более быстрого развития по сравнению с конкурентами.</p>
                            <p className="perspectivesBlock-advantages__advantageItem">Высокая доля импорта, что обеспечивает
                                широкие возможности для развития импортозамещающих производств.</p>
                        </div>
                    </div>
                </div>
                <div className="forsuppliers-wrapper">
                    <div className="forSuppliers-inner">
                        <p className="forSuppliers-inner mainTitle">
                            omnichem.ru - один самых перспективных инструментов развития на химическом рынке
                        </p>
                        <a className="forSuppliers-link" href="http://212.233.79.177:6688/" target='_blanket' rel="noopener noreferrer">Узнать о возможностях для поставщиков</a>

                    </div>
                </div>

            </div>
        </div>


    )
}

export default MarketView;
