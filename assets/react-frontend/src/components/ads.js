import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom"
import UrlContext from "../utils/context/urlContext"
import Axios from "axios";
import AliceCarousel from "react-alice-carousel";

import "./ads.css";
const responsive = {
  0: { items: 1 },
  1024: { items: 2 },
};
const Ads = () => {

  const [galleryItems, setGalleryItems] = useState([])
  const [myUrl, setMyUrl] = useState("")
  const [myAds, setMyAds] = useState("")
  const { setUrl_redirect } = useContext(UrlContext)

  const { hash } = useParams()

  const history = useHistory()

  const getData = async () => {
    
    let result = null;
    
    try {
      result = await Axios.get(
        `http://aa-shortener.poomrokc.services/api/public/urls/${hash}/redirect`
      );
      let { target_url, ad } = result.data;
    
      setMyUrl(target_url)
      setUrl_redirect(target_url)
      setMyAds(ad)
      const data = [];
      data.push({ download_url: `http://aa-shortener.poomrokc.services${ad}` });
      const img = data.map((m) => (
        <a href={m.link}>
          <img className="ads_img" src={m.download_url} alt="" />
        </a>
      ));
      setGalleryItems(img)
    } catch (err) {
      history.push('/')
    }
  }

  useEffect(() => {
    
    getData()

  }, [])

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
}

export default withRouter(Ads);
