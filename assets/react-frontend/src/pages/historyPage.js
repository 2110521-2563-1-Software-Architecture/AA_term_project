import React from "react";
import Logo from '../../assets/logo.png'
//import history from "../history";
//import Util from "../api/Util";
import 'bootstrap/dist/css/bootstrap.min.css';

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
          style={{ width: 600, border: "thick solid black" }}
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
            <div className="row" align="center">
            <div className="col-md-12" align="center">
              <table class="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th scope="col" style={{ fontFamily: "Courier New" }}>#</th>
                        <th scope="col" style={{ fontFamily: "Courier New" }}>url</th>
                        <th scope="col" style={{ fontFamily: "Courier New" }}>view</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(item => (
                      <tr>
                        <th scope="row" style={{ fontFamily: "Courier New" }}>1</th>
                        <td style={{ fontFamily: "Courier New" }}>{item.url}</td>
                        <td style={{ fontFamily: "Courier New" }}>{item.number}</td>
                      </tr>
                      ))}
                  </tbody>
                </table>
                </div>    
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
