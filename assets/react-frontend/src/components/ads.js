<<<<<<< HEAD
import React,{Component}from "react";
//import history from "../history";
=======
import React, { Component } from "react";
import history from "../history";
>>>>>>> add get link
//import Util from "../api/Util";
import { withRouter } from "react-router";
import Axios from "axios";
import AliceCarousel from "react-alice-carousel";
import Logo from "../../assets/logo.png";
import Con from "../../assets/container.jpg";

<<<<<<< HEAD

import "./Ads.css"
=======
import "./ads.css";
>>>>>>> add get link
const responsive = {
  0: { items: 1 },
  1024: { items: 2 },
};
class Ads extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      galleryItems : [],
    };
  }

  render() {
    return (
      <div>
      <AliceCarousel
        items={this.state.galleryItems}
        duration={100}
        disableButtonsControls={true}
        disableDotsControls={true}
        disableSlideInfo={true}
        autoPlay={true}
        startIndex = {1}
        responsive={responsive}
        autoPlayInterval={1000}
        paddingLeft = "100"
        infinite = {true}
       />
    </div>
    );
  }

<<<<<<< HEAD
  

  getData(){
=======
  async getData() {
>>>>>>> add get link
    // axios.get(`https://picsum.photos/v2/list?limit=6`, {})
    // .then(res => {
    //         const data = res.data
    //       const img = data.map(m =>
    //         <a href = "">
    //         <img src={m.download_url} alt=""/>
    //       )
    //       this.setState({
    //         galleryItems: img
    //       })
    //     }).catch((error) => {
    //         console.log(error)
    //     })
<<<<<<< HEAD
    const data = [{
      download_url :Logo,
      link: "https://www.facebook.com/"
    },{
      download_url :Con,
      link: "https://www.facebook.com/"
    }]
    const img = data.map(m=>
              <a href = {m.link}>
              <img className="ads_img" src={m.download_url} alt=""/>
              </a>
    )
    this.setState({
              galleryItems: img
            })
    }

   
    componentDidMount() {
      this.getData()
    }

=======
    let result = null;
    try {
      result = await Axios.get(
        `http://aa-shortener.poomrokc.services/api/public/urls/${this.props.match.params.hash}/redirect`
      );
    } catch (err) {
      history.push("/");
    }
    let { target_url, ad } = result.data;
    this.setState({ target_url, ad });
    const data = [];
    data.push({ download_url: `http://aa-shortener.poomrokc.services${ad}` });
    const img = data.map((m) => (
      <a href={m.link}>
        <img className="ads_img" src={m.download_url} alt="" />
      </a>
    ));
    this.setState({
      galleryItems: img,
    });
  }

  componentDidMount() {
    this.getData();
  }
>>>>>>> add get link
}

export default withRouter(Ads);
