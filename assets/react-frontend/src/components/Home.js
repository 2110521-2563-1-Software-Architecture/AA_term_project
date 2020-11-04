import React from "react";
import Logo from '../../assets/logo.png'
import Qrplace from '../../assets/qrplacehold.png'
import QRCode from "qrcode.react";
import "./Home.css"

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        webside: "",
        domain: "",
        shorten_web:"www.google.com",
        isLogin: true,
      };
    }
    clearPage(){
      this.setState({ webside: "", domain: "", shorten_web: ""})
    };
  
    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="headright col-sm-4 offset-sm-1">
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
              <input type="text" id="inputlink" className="linkinput" placeholder="Your link or Url"/>
            </div>
            <div className="col-sm-1 rmvpad">
              <input type="button" className="shortbtn" value="Short it"/>
            </div>
          </div>
          <div className="row shorttab">
            <div className="col-sm-1 offset-sm-2 yourlink rmvpad">
              Shorten link
            </div>
            <div className="col-sm-6 rmvpad">
              <input type="text" id="genlink" className="linkinput" placeholder="Generated link" readOnly/>
            </div>
            <div className="col-sm-1 rmvpad">
              <input type="button" className="shortbtn" value="Copy"/>
            </div>
          </div>
          <div className="row shorttab">
            <div className="col-sm-8 offset-sm-2 qrtab">
              <div className="qrbox">
                  <img className="qrcode" id="qrcode" src={Qrplace}/>
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
                  <td className="benefit">Customize domain for your link</td>
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
            <input type="button" className="membtn" value="Register Now"/>
            </div>
          </div>
        </div>
      )
    }
    onClickGenerate() {
        event.preventDefault();
        console.log("test");
        this.setState({shorten_web : "www.google.com"});
    };
    async componentDidMount() {
        this.clearPage();
    }
     
}
    
export default Home;