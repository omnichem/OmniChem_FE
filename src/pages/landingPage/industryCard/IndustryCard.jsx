import React from 'react';
import './industryCard.css';

const IndustryCard = ({ image, title }) => {
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
						href="http://212.233.79.177/materials/"
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
