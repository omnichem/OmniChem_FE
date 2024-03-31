import React from 'react';
import './forSuppliers.css';
import { useNavigate } from 'react-router';

const ForSuppliers = () => {
	const navigate = useNavigate();
	return (
		<div className="forsuppliers">
			<div className="forSuppliers-inner">
				<p className="forSuppliers-inner mainTitle">
					omnichem.ru - один самых перспективных инструментов развития на
					химическом рынке
				</p>
				<a
					className="forSuppliers-link"
					onClick={() => navigate('/materials')}
					target="_blanket"
					rel="noopener noreferrer"
				>
					Узнать о возможностях для поставщиков
				</a>
			</div>
	</div>
	);
};

export default ForSuppliers;
