import React from 'react';
import './footerItem.css';

const FooterItem = ({ itemName }) => {
	return (
		<>
			<p className="footerItem">{itemName}</p>
		</>
	);
};

export default FooterItem;
