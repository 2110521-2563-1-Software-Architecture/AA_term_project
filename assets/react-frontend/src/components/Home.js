import React from "react";
import Logo from '../../assets/logo.png'
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
            <div className="headleft col-sm-5 offset-sm-1">
              Short ur link
            </div>
            <div className="headright col-sm-5">
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