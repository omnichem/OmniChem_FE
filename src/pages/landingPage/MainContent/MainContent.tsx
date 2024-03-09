import React from 'react';


import AboutSection from '../about/AboutSection';
import IndustrySector from '../industries/IndustrySector';
import WhyUs from '../whyUs/WhyUs';
import MarketView from '../marketVeiw/MarketView';



const MainContent = () => {
  return (
      <div className="main">
        <AboutSection/>
        <IndustrySector />
        <WhyUs />
        <MarketView />
      </div>
  )
}

export default MainContent
