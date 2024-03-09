import './style/main.css';
import Header from './header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './footer/Footer';

export function Landing() {
  return (
    <div className="App">
      <Header />
      <MainContent/>
      <Footer/>
    </div>
  );
}
