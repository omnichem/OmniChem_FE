import React from 'react'
import { marketNumbers } from '../data';
import MarketNumbersBlock from '../marketNumbersBlock/MarketNumbersBlock';
import './marketView.css';

const MarketViewFeaturesBlock = () => {
  return (
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
  )
}

export default MarketViewFeaturesBlock