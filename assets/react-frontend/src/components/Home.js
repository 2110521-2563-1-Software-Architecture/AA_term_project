import React, { useEffect, useState } from "react";
import Axios from "axios";

import Headpic from '../../assets/headpic.png';
import Qrplace from '../../assets/qrplacehold.png'
import QRCode from "qrcode.react";
import "./Home.css";

const Home = () => {
    const [website, setWebsite] = useState("");
    const [generatedlink, setGenlink] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [customoption, setCustom] = useState("");
    const [customname,setCustomname] = useState("");
    const [linkname,setLinkname] = useState("");
  
    useEffect(() =>{
      if(localStorage.getItem('token')){
        setIsLogin(true);
      }
    }, [])

    const generatelink = async () => {
      setGenlink(website);

      if (localStorage.getItem('token')) {
        const JwtToken = `JWT ${localStorage.getItem('token')}`

        const newURL = {
          target_url: website,
          name: linkname, // TODO 
          domain: 'aa-shortener.poomrokc.services/'+customname, // TODO
        }

        const res = await Axios.post("http://aa-shortener.poomrokc.services/api/public/urls/", newURL, { headers: { Authorization: JwtToken } })

      }

    }

    const copyLink = (e) => {
      e.preventDefault();
      var copyText = document.getElementById("genlink");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
      alert("Copy link to clipboard!")
    }
    if(!isLogin){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="headright col-sm-4 offset-sm-1">
            <img className="imghead" src={Headpic}/>
          </div>
          <div className="headleft col-sm-6">
            <div className="textad">
              SHORTER, GROWER 📈<br/>
              <span className="text2">Short your link now with </span><span className="websitename"> AAShortener!!</span>
            </div>
          </div>
        </div>
        <div className="row shorttab">
          <div className="col-sm-7 offset-sm-2 rmvpad">
            <input type="text" id="inputlink" className="linkinput" placeholder="Your link or Url"  onChange={(e) => {setWebsite(e.target.value)}}/>
          </div>
          <div className="col-sm-1 rmvpad">
            <input type="button" className="shortbtn" value="Short it" onClick={generatelink}/>
          </div>
        </div>
        <div className="row shorttab">
          <div className="col-sm-2 offset-sm-2 yourlink rmvpad">
            Shorten link
          </div>
          <div className="col-sm-5 rmvpad">
            <input type="text" id="genlink" className="linkinput" placeholder="Generated link" value={generatedlink} readOnly/>
          </div>
          <div className="col-sm-1 rmvpad">
            <input type="button" className="shortbtn" value="Copy" onClick={(e) => {copyLink(e)}}/>
          </div>
        </div>
        <div className="row shorttab">
          <div className="col-sm-8 offset-sm-2 qrtab">
            <div className="qrbox">
              {generatedlink?<QRCode className="qrcode" id="qrcode" value={generatedlink}/>
              : <img className="qrcode" id="qrcode" src={Qrplace}/> }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 offset-1 memberad">
            Link is too complicated? Just <span className="boldtext">custom domain</span> yourself.<br/>
            Become our Member now!
            <table className="membertable">
            <tbody>
              <tr>
                <td className="benefit" style={{visibility:"hidden"}}>a</td>
                <td className="type">Guest</td>
                <td className="type member">Member</td>
              </tr>
              <tr>
                <td className="benefit">Short your link in few second</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td className="benefit">Generate QRcode to your link</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td className="benefit">Customize alias for your link</td>
                <td>-</td>
                <td>✅</td>
              </tr>
              <tr>
                <td className="benefit">View link visited history</td>
                <td>-</td>
                <td>✅</td>
              </tr>
          </tbody>
          </table>
          <a href="/register"><input type="button" className="membtn" value="Register Now"/></a>
          </div>
        </div>
      </div>
    )
    }
    else{
      return(
        <div className="container-fluid greenbg">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <div className="memtitle">
                Generate auto/custom alias shorten link
              </div>
            </div>
          </div>
          <div className="row memshorttab">
            <div className="col-sm-4 offset-sm-1 qrtab">
              <div className="qrbox">
                {generatedlink?<QRCode className="qrcode" id="qrcode" value={generatedlink}/>
                : <img className="qrcode" id="qrcode" src={Qrplace}/> }
              </div>
              <div className="genlinktab">
                <input type="text" id="genlink" className="genlinkmem" placeholder="Generated link" value={generatedlink} readOnly/>
              </div>
              <div className="genlinktab">
                <input type="button" className="copybtn" value="Copy" onClick={(e) => {copyLink(e)}}/>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-2 offset-sm-1">
                  Option
                </div>
                <div className="col-sm-9">
                  <select id="customoption" className="memlinkinput" onChange={(e) => setCustom(e.target.value)}>
                    <option value="auto">Auto</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 offset-sm-1">
                  Link
                </div>
                <div className="col-sm-9">
                  <input type="text" id="inputlink" className="memlinkinput" placeholder="Your link or Url"  onChange={(e) => {setWebsite(e.target.value)}}/>
                </div>
              </div>
                {
                  customoption=="custom" ?
                  <div className="row">
                    <div className="col-sm-3 offset-sm-1">
                      URL name
                    </div>
                    <div className="col-sm-8">
                      <input type="text" id="customname" className="memlinkinput" placeholder="Custom alias for your link ex. mylink"  onChange={(e) => {setCustomname(e.target.value)}}/>
                    </div>
                  </div>
                  :null
                }
              <div className="row">
                <div className="col-sm-3 offset-sm-1">
                  Name(optional)
                </div>
                <div className="col-sm-8">
                  <input type="text" id="linkname" className="memlinkinput" placeholder="Link name (For yourself only)"  onChange={(e) => {setLinkname(e.target.value)}}/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 offset-sm-2 shortbtndiv">
                  <input type="button" className="shortbtnmem" value="Generate Link" onClick={generatelink}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
     
}
    
export default Home;