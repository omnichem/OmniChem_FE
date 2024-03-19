import React from 'react';
import './industryCard.css';
import { useNavigate } from 'react-router';

const IndustryCard = ({ image, title }) => {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				<div className="gridCard-item">
					<img
						className="gridCard-img"
						src={image}
						alt="рынок"
					/>
					<a
						className="gridCard-item__link"
						onClick={() => navigate('/materials')}
						target="_blanket"
						rel="noopener noreferrer"
					>
						<span className="gridCard-title">{title}</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default IndustryCard;
