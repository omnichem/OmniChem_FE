import './style/mainProject.css';
import Header from './header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './footer/Footer';

export const Landing=()=> {
	return (
		<div className="App">

			<Header />
			<MainContent />
			<Footer />
		</div>
	);
}
