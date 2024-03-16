import React from 'react';
import './footer.css';
import {
	forSuppliersItems,
	forСustomerItems,
	aboutCompanyItems,
} from '../data';

import omniLogo from '../logo v3.png';
import FooterItem from './footerItem/FooterItem';
import { Popover } from 'antd';
import repairImg from '../images/repair.jpg'

const content = (
  <div className='modalWind'>
		<img className='repairImg' src={repairImg} alt="ремонт" />
		<h2 className="modalWindTitle">Страница временно недоступна</h2>
    <p className="modalWindText">В настоящее время страница находится в разработке.</p>
  </div>
);

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-container">
				<div className="footerItems-box">
					<div className="footerItems">
						<p className="footerItem-title">Для покупателей</p>
						<Popover content={content}>
								{forSuppliersItems.map((forSuppliersItem) => (
									<FooterItem
										key={forSuppliersItem.itemName}
										{...forSuppliersItem} 
									/>
							))}
						</Popover>
					</div>
					<div className="footerItems">
						<p className="footerItem-title">Для поставщиков</p>
						<Popover content={content}>
								{forСustomerItems.map((forСustomerItem) => (
								<FooterItem
									key={forСustomerItem.itemName}
									{...forСustomerItem}
									/>
								))}
						</Popover>
					</div>
					<div className="footerItems">
						<p className="footerItem-title">О компании</p>
						<Popover content={content}>
							{aboutCompanyItems.map((aboutCompanyItem) => (
								<FooterItem
									key={aboutCompanyItem.itemName}
									{...aboutCompanyItem}
									/>
								))}
						</Popover>
					</div>
				</div>
				<img
							className="omni-logo"
							src={omniLogo}
							alt="omnichem logo"
						/>
				<div className="footer-copyright">
					<p className="copyright">© omnichem.ru 2023</p>
					<p className="copyright">Политика обработки данных</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
