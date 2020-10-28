import React from "react";
//import history from "../history";
//import Util from "../api/Util";
import Logo from '../../assets/logo.png'

import "./shorten-form.css"
class ShortenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webside: "",
      domain: "",
    };
  }

  render() {
    return (
    <div className="decorate" align="center" style={{ paddingTop: 70 }}>
      <div className="Card " style={{ width: 750 }}>
        <div className="Card " style={{ width: 750}}>
          <img src={Logo} style={{ width: 160}}/>
          <br />
        </div>
        <div
          className="Card box"
          style={{ width: 500, border: "thick solid black" }}
        >
          <br />
          <div className="row">
            <div className="col-md-12 ">
              <h2 className="card-title" style={{ fontFamily: "Courier New" }}>
              Create shorten URL
              </h2>
            </div>
          </div>
          <form
            className="needs-validation"
            onSubmit={(event) => this.onSubmit(event)}
          >

            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <div align="left" style={{width:300, fontFamily: "Courier New"}}>www.</div>
                <label className="text-dark">
                  <input
                    type="text"
                    className="box1"
                    name="webside"
                    required
                    onChange={(e) => {
                      this.setState({ webside: e.target.value });
                    }}
                  />
                </label>
              </div>
              <br />
              <div className="col-md-2"></div>
            </div>

            <div className="col-md-4" style={{display: "none"}}>
                <div align="left" style={{ width: 300, fontFamily: "Courier New"}}>Domain</div>
                <label className="text-dark">
                  <input
                    type="text"
                    name="domain"
                    className="box1"
                    onChange={(e) => {
                      this.setState({ domain: e.target.value });
                    }}
                  />
                </label>
              </div>
              



            <div className="row">
              <div className="col-md-2">
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-outline-dark"
                  style={{ fontFamily: "Courier New" }}
                >
                  Generate URL
                </button>
              </div>
            </div>
          </form>
          <br />
          <div className="output">
            <input className="box2" value="www.aaa.com" id = "webside_output"/>
            <button
              className = "copy_btn"
              onClick={e => {
                      e.preventDefault();
                      var copyText = document.getElementById("webside_output");
                      copyText.select();
                      copyText.setSelectionRange(0, 99999)
                      document.execCommand("copy");
                    }
                  }>
              Copy
            </button>
            <div className="box_qr">
            <img className="qr_img" src={Logo} id ="qr_img"/>
            </div>
          </div>
        </div>

      </div>
    </div>
    );
  }


 /*generateQR = async (event) => {
    //event.preventDefault();
    history.push("/login");
     let data = await Util.generateQR(
      this.state.webside,
      this.state.domain,
    );
    qr_src = data.qrCode
    shorten_link = data.shortenLink
    console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
    } else {
      //set shorten_link to value on id webside_output
      //set qr_src to src on id qr_img
    }
  };*/
}

export default ShortenForm;
