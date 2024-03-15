import React from 'react';
import './advantageBlock.css';

const AdvantageBlock = ({ advantageText }) => {
	return (
		<>
			<p className="perspectivesBlock-advantages__advantageItem">
				{advantageText}
			</p>
		</>
	);
};

export default AdvantageBlock;
