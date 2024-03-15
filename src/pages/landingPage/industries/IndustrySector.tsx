import React from 'react';
import './industrySector.css';

import IndustryCard from '../industryCard/IndustryCard';
import Suppliers from '../suppliers/Suppliers';


const IndustrySector = () => {
    return (
        <div className="industrySector">
            <div className="industrySector-wrapper">
                <div className="industrySector__title">
                    <h2>Тестовое изменение</h2>
                    <h2 className="mainTitle">
                        Отрасли с которыми мы работаем:
                    </h2>
                </div>
                <IndustryCard />
                <div className="industrySector-suppliers">
                    <div>
                        <h2 className="supppliers-title">Данные о продуктах от мировых лидеров:</h2>
                    </div>
                    <Suppliers />
                </div>
            </div>
        </div>
    )
}

export default IndustrySector;