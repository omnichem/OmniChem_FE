import React from 'react';
import './perspectivesBlock.css'
import { advantages } from '../data';
import AdvantageBlock from '../advantageBlock/AdvantageBlock';

const PerspectivesBlock = () => {
	return (
<div className="perspectivesBlock">
<div className="perspectivesBlock-advantages">
  <h2 className="perspectivesBlock-advantages__title mainTitle">
    Это один из самых перспективных рынков благодаря нескольким
    факторам:
  </h2>
  <div className="perspectivesBlock__advantagesList">
    {advantages.map((advantage) => (
      <AdvantageBlock
        key={advantage.advantageNumber}
        {...advantage}
      />
    ))}
  </div>
</div>
</div>
	);
};

export default PerspectivesBlock;