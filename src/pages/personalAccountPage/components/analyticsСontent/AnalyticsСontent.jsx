import { Divider, Row } from "antd";
import PickerDate from "../pickerDate/PickerDate";
import "./analyticsСontent.css";
import TabMenu from "../tabMenu/TabMenu";
import GridStatistics from "../GridStatistics/GridStatistics";

function AnalyticsСontent() {
 
  return (
    <div className="AnalyticsСontent">
      <div className="AnalyticsСontent-container">
        <div className="menuTabs-wrapper">
          <TabMenu/>
          <PickerDate/>
        </div>
        <Divider/>
        <div className="usersStat-container">
          <GridStatistics  />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsСontent;
