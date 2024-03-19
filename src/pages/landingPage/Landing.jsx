import './landing-page.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import AboutSection from './about/AboutSection';
import IndustrySector from './industries/IndustrySector';
import WhyUs from './whyUs/WhyUs';
import MarketView from './marketVeiw/MarketView';
import ForSuppliers from './forsuppliers/ForSuppliers';
import PerspectivesBlock from './perspectivesBlock/PerspectivesBlock';

export const Landing=()=> {
	return (
		<div className="landing-page-wrapper">
			<Header />
				<div className='landing-page-content-wrapper'>
					<AboutSection />
					<IndustrySector />
					<WhyUs />
					<MarketView />
					<PerspectivesBlock />
					<ForSuppliers/>
				</div>
			<Footer />	
		</div>
	);
}
