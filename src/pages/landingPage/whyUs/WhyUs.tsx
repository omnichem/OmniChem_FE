import React from "react";
import "./whyUs.css";

import imgFeatures from "./images/img.webp";
import { features } from "../data";
import FeatureItem from "../features/featureItem/FeatureItem";

const WhyUs = () => {
  return (
    <div className="whyUs">
      <img className="features-img" src={imgFeatures} alt="фон" />
      <div className="whyUs-content">
        <div className="whyUs-content-up">
          <h2 className="whyUs-content-subtitle">
            Почему omnichem лучшее привычного поиска:{" "}
          </h2>
          <h2 className="mainTitle">Делаем поиск сырья проще</h2>
          <h2 className="whyUs-content-title mainTitle">
            Просматривайте более 100 000 продуктов, находите аналоги, изучайте
            документацию и базовые технологические карты.
          </h2>
        </div>

        <div className="whyUs-features__content">
          <div className="features-items">
            {features.map((feature) => (
              <FeatureItem key={feature.featuresTitle} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
