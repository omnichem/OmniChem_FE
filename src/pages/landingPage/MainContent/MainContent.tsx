import React from "react";
import "./mainContent.css";

import AboutSection from "../about/AboutSection";
import IndustrySector from "../industries/IndustrySector";
import WhyUs from "../whyUs/WhyUs";
import MarketView from "../marketVeiw/MarketView";
import ForSuppliers from "../forsuppliers/ForSuppliers";
import PerspectivesBlock from "../perspectivesBlock/PerspectivesBlock";

const MainContent = () => {
  return (
    <>
      <AboutSection />
      <IndustrySector />
      <WhyUs />
      <MarketView />
      <PerspectivesBlock />
      <ForSuppliers />
    </>
  );
};

export default MainContent;
