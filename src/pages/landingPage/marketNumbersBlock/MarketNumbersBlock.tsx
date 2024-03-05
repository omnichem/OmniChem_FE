
import './marketNumbersBlock.css';

const MarketNumbersBlock = () => {
    return (
        <div className='MarketNumbersBlock'>
            <div className="marketNumbers-grid">
                <div className="marketNumbers-item">
                    <div className="marketNumbers-inner">
                        <p className="marketNumbers-item__number">≈ 7,5</p>
                        <p className="marketNumbers-item__unit">трлн ₽</p>
                        <p className="marketNumbers-item__description">
                            объем потребления химического сырья в 2023 г.</p>
                    </div>
                </div>
                <div className="marketNumbers-item">
                    <div className="marketNumbers-inner">
                        <p className="marketNumbers-item__number">720 625</p>
                        <p className="marketNumbers-item__description">
                            компаний, занимающихся обрабатывающим производством</p>
                    </div>
                </div>
                <div className="marketNumbers-item">
                    <div className="marketNumbers-inner">
                        <p className="marketNumbers-item__number">&gt; 84 %</p>
                        <p className="marketNumbers-item__description">
                            ежегодный прогнозируемый рост рынка до 2030 г.</p>
                    </div>
                </div>
                <div className="marketNumbers-item">
                    <div className="marketNumbers-inner">
                        <p className="marketNumbers-item__number">&#62; 12 %</p>
                        <p className="marketNumbers-item__description">
                            доля в ВВП Российской Федерации.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketNumbersBlock;
