<<<<<<< HEAD
<<<<<<< HEAD
import React,{Component}from "react";
//import history from "../history";
=======
import React, { Component } from "react";
import history from "../history";
>>>>>>> add get link
//import Util from "../api/Util";
import { withRouter } from "react-router";
=======
import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
import { useHistory, useParams, withRouter } from "react-router-dom"
import UrlContext from "../utils/context/urlContext"
>>>>>>> finish url redirect
=======
import { useHistory, useParams, withRouter } from "react-router-dom";
import UrlContext from "../utils/context/urlContext";
>>>>>>> add page not found page
import Axios from "axios";
import AliceCarousel from "react-alice-carousel";

<<<<<<< HEAD

import "./Ads.css"
=======
import "./ads.css";
>>>>>>> add get link
const responsive = {
  0: { items: 1 },
  1024: { items: 2 },
};
<<<<<<< HEAD
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
=======
const Ads = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [myUrl, setMyUrl] = useState("");
  const [myAds, setMyAds] = useState("");
  const { setUrl_redirect } = useContext(UrlContext);

  const { hash } = useParams();

  const history = useHistory();

  const getData = async () => {
<<<<<<< HEAD
    
>>>>>>> finish url redirect
=======
>>>>>>> add page not found page
    let result = null;

    try {
      result = await Axios.get(
        `http://aa-shortener.poomrokc.services/api/public/urls/${hash}/redirect`
      );
      let { target_url, ad } = result.data;

      setMyUrl(target_url);
      setUrl_redirect(target_url);
      setMyAds(ad);
      const data = [];
      data.push({ download_url: `http://aa-shortener.poomrokc.services${ad}` });
      const img = data.map((m) => (
        <a href={m.link}>
          <img className="ads_img" src={m.download_url} alt="" />
        </a>
      ));
      setGalleryItems(img);
    } catch (err) {
      history.push("/404");
    }
  };

<<<<<<< HEAD
  componentDidMount() {
    this.getData();
    console.log(this.props)
  }
>>>>>>> add get link
=======
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AliceCarousel
        items={galleryItems}
        duration={100}
        disableButtonsControls={true}
        disableDotsControls={true}
        disableSlideInfo={true}
        autoPlay={true}
        startIndex={1}
        responsive={responsive}
        autoPlayInterval={1000}
        paddingLeft="100"
        infinite={true}
      />
    </div>
  );
<<<<<<< HEAD
>>>>>>> finish url redirect
}
=======
};
>>>>>>> add page not found page

export default withRouter(Ads);
