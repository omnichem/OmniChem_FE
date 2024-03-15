import React from "react";
import "./footer.css";
import {
  forSuppliersItems,
  forСustomerItems,
  aboutCompanyItems,
} from "../data";

import omniLogo from "../logo v3.png";
import FooterItem from "./footerItem/FooterItem";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footerItems-box">
          <div className="footerItems">
            <p className="footerItem-title">Для покупателей</p>
            <a href="#">
              {forSuppliersItems.map((forSuppliersItem) => (
                <FooterItem
                  key={forSuppliersItem.itemName}
                  {...forSuppliersItem}
                />
              ))}
            </a>
          </div>
          <div className="footerItems">
            <p className="footerItem-title">Для поставщиков</p>
            <a href="#">
              {forСustomerItems.map((forСustomerItem) => (
                <FooterItem
                  key={forСustomerItem.itemName}
                  {...forСustomerItem}
                />
              ))}
            </a>
          </div>
          <div className="footerItems">
            <p className="footerItem-title">О компании</p>
            <a href="#">
              {aboutCompanyItems.map((aboutCompanyItem) => (
                <FooterItem
                  key={aboutCompanyItem.itemName}
                  {...aboutCompanyItem}
                />
              ))}
            </a>
          </div>
        </div>
        <img className="omni-logo" src={omniLogo} alt="omnichem logo" />
        <div className="footer-copyright">
          <p className="copyright">© omnichem.ru 2023</p>
          <p className="copyright">Политика обработки данных</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
