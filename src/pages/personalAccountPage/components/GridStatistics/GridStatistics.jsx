import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import './gridStatistics.css'
import axios from 'axios';
const style = {
  background: '#ffff',
  padding: '8px 0',
};


  const GridStatistics = () => {
  
    const [data, setData] = useState([]);

    useEffect(() => {
      const getDataApi = async () => {
       const dataResponse = await axios.get('http://localhost:8000/API/v2/wiki/materials/?page=1&page_size=10')
        .catch(function (error) {
          // handle error
          console.log(error);
    });
      setData(dataResponse.data.results);
      console.log(dataResponse);
      }
      getDataApi();
    }, [data]);

    console.log(data);
    
    return (
      <div>
        <Row gutter={[10, 10]}>

        {data.map((userItemData) => {
          return (
            <Col key={userItemData.id} className='colRow2' xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
              <div className="userStat-item__wrapper">
                <p className="usersStat-Name">{userItemData.name}</p>
                <div className="userStat-NumbersBlock">
                  <p className="usersStat-quantity">{userItemData.id}</p>
                  <div className="usersStat-percentage"><p className="percentage">{userItemData.id}%</p></div>
                </div>
              </div>
            </Col>
      )
        })}
      </Row>
  </div>
    )
}
  
  export default GridStatistics;
  