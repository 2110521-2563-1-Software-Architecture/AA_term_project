import React from "react";
//import history from "../history";
//import Util from "../api/Util";
import Logo from '../../assets/logo.png'

import "./ads.css"
class Ads extends React.Component {


  render() {
    return (
    <div className="adv_container" style={{ paddingTop: 70 }}>
      <div className="box_ads">
            <img className="ads_img" src={Logo}/>

      </div>
      <div className="box_ads">
            <img className="ads_img" src={Logo}/>

      </div>
    </div>
    );
  }

}

export default Ads;
