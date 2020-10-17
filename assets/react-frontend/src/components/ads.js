import React from "react";
//import history from "../history";
//import Util from "../api/Util";
import Logo from '../../assets/logo.png'

import "./Ads.css"
import { Link } from "react-router-dom";
class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link1: "",
      link2: "",
      ads1_src:"",
      ads2_src:"",
    };
  }

  render() {
    return (
    <div className="adv_container" style={{ paddingTop: 70 }}>
      {this.state.ads1_src?
      <div className="box_ads">
            <a href={this.state.link1} ><img className="ads_img" src={this.state.ads1_src} /></a>

      </div>:
      <div/>
      }
      { 
      this.state.ads2_src?
      <div className="box_ads">
        <a href={this.state.link2}><img className="ads_img" src={this.state.ads2_src} id ="ads2"/></a>
      </div>:
      <div/>
    }
    </div>
    );
  }

  componentDidMount(){
    /*link = "https://"" */
    this.setState({link1:"https://www.google.com",link2:"https://www.google.com",ads1_src:Logo,ads2_src:Logo}) 
  }

}

export default Ads;
