import { Col } from 'antd';
import './statisticsBlock.css';

const StatisticsBlock = ({
  statisticName,
  totalCount,
  percentage,
}: {
  statisticName: string;
  totalCount: number;
  percentage: string;
}) => {
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
  );
};

export default StatisticsBlock;
