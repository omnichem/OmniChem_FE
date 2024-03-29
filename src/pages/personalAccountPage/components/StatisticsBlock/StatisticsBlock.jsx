import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import './statisticsBlock.css'

const style = {
  background: '#ffff',
  padding: '8px 0',
};

  const StatisticsBlock = ({ statisticName, totalCount, percentage}) => {
    
    return (

      <div className="colStat">
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <div className="userStat-item__wrapper">
           <p className="usersStat-Name">{statisticName}</p>
            <div className="userStat-NumbersBlock">
              <p className="usersStat-quantity">{totalCount}</p>
              <div className="usersStat-percentage">
                <p className="percentage">{percentage}%</p>
             </div>
           </div>
         </div>
        </Col>
    </div>
    )
}
  
  export default StatisticsBlock;
  