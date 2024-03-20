import './marketView.css';
import { marketNumbers, advantages } from '../data';

import ellips21 from './Ellipse 21.png';
import MarketNumbersBlock from '../marketNumbersBlock/MarketNumbersBlock';


const MarketView = () => {
	return (
		<div className="marketView">
				<div className="ellips-block">
					<img
						className="Ellipse"
						src={ellips21}
						alt="фон"
					/>
					<div className="marketView-future">
						<div className="future-Content">
							<h2 className="future-Content__title">
								Видим будущее в развитии химической отрасли
							</h2>
							<div className="future-Content__inner">
								<div className="future-Content__leftBlock">
									<p className="leftBlock-txt">
										Мы в <span className="omnichem"> omnichem </span> уверены,
										что химическая отрасль это драйвер развития любой другой
										отрасли. Мы считаем, что простой и открытый доступ к
										информации о сырье позволяет вам работать эффективнее и
										быстрее, чтобы вы могли разрабатывать новые продукты и
										улучшать свои бизнес показатели.
									</p>
								</div>
								<div className="future-Content__rightBlock">
									<p className="rightBlock-upTxt">
										Благодаря вам развивается производство автомобилей и
										лекарств. Повышается эффективность сельского хозяйства.
										Появляются инновационные косметические средства и
										биоразлагаемая упаковка. Повышается технологическая
										независимость и продовольственный суверенитет. Это лишь
										малая часть отраслей в развитии которых участвует химия.
									</p>
									<p className="rightBlock-downTxt">
										Нам не терпится увидеть, какие еще отрасли начнут
										развиваться быстрее с появлением omnichem.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="marketView-featuresBlock">
						<h2 className="mainTitle">Рынок химии в России это:</h2>
						<div className="marketNumbers-list">
							{marketNumbers.map((marketNumber) => (
								<MarketNumbersBlock
									className="MarketNumbersBlock"
									key={marketNumber.figure}
									{...marketNumber}
								/>
							))}
						</div>
					</div>
				</div>
			</div>


	);
};

export default MarketView;
