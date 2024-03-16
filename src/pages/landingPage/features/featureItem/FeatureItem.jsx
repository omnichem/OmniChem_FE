/** @format */

import React from 'react';
import './featureItem.css';

const FeatureItem = ({
	firstIcon,
	secondIcon,
	featuresTitle,
	featuresDescription,
}) => {
	return (
		<div className="features-item">
			<div className="features-icons">
				<img
					className="feature-icon"
					src={firstIcon}
					alt="иконка"
				/>
				<img
					className="feature-cartIcon"
					src={secondIcon}
					alt=""
				/>
			</div>
			<h2 className="features-title">{featuresTitle}</h2>
			<p className="features-description">{featuresDescription}</p>
		</div>
	);
};

export default FeatureItem;
