import React from 'react';
import './industrySector.css';

import Suppliers from '../suppliers/Suppliers';
import { industryCards, suppliers } from '../data';
import IndustryCard from '../industryCard/IndustryCard';
import { Card } from 'antd';
import { useNavigate } from 'react-router';

const IndustrySector = () => {
	const navigate = useNavigate();
	return (
		
		<div className="industrySector">
						<div className="industrySector-wrapper">
				<h2 className='industrySector-title'>Отрасли с которыми мы работаем:</h2>
						<div>
							<div className='industry-cards-wrapper'>
							{industryCards.map((industryCard) => (
							
							<Card onClick={() => navigate('/materials')} style={{height: '250px', lineWidth: '24', padding: '20'}}
								hoverable
								key={industryCard.title}
								// {...industryCard}
								
							>
								<img alt='' className='gridCard-img' src={industryCard.image}/>
								<div card-body>
								<p className='gridCard-title'>{industryCard.title}</p>
								</div>
								
							</Card>
						))}
							</div>
						
						</div>
				
				<div className="industrySector-suppliers">
							<h2 className="supppliers-title">
								Данные о продуктах от мировых лидеров:
							</h2>
							<div className='suppliers-cards-wrapper'>
							{suppliers.map((supplier) => (	
									<Suppliers
										key={supplier.name}
										{...supplier}
									/>
								))}
							</div>			
				</div>
			</div>
		</div>
	
	);
};

export default IndustrySector;
