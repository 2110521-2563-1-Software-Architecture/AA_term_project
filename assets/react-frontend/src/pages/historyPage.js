import React from "react";
import Logo from '../../assets/logo.png'
//import history from "../history";
//import Util from "../api/Util";

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         data: [
           {
             url: "www.hello.ewwr.com",
             number: "4"
           },
           {
            url: "www.hello.erer.com",
             number: "45"
           },
           {
             url: "www.hello.dfss.com",
             number: "16"
           },
           {
            url: "www.hello.oio.com",
            number: "420"
           },
           {
            url: "www.hello.dfdf.com",
            number: "50"
           },
           {
            url: "www.hello.iopo.com",
            number: "80"
           }
         ]
    };
  }

  render() {
    const Emp = <div></div>;
    if (!this.state.data) {
      return Emp;
    } else {
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
                History
              </h2>
            </div>
            <br />
          </div>
            <div className="row">
                  {this.state.data.map(item => (
                    <div>{item.url}{item.number}</div>
                  ))}
            </div>
          <br />
        </div>
      </div>
      </div>
        
      );
    }
  }
 /*onSubmit = async (event) => {
    event.preventDefault();
    history.push("/login");
     let data = await Util.register(
      this.state.userName,
      this.state.password,
    );
    console.log(data);
    if (data.errmsg) {
      window.alert(data.errmsg);
    } else {
      history.push("/login");
    }
  };*/
}

export default HistoryPage;
