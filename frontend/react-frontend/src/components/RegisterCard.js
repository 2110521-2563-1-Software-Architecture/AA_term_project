import React from "react";
import history from "../history";
import '../components/RegisterCard.css'
import Logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault();
    
  }

  render() {
    return (
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
                Register
              </h2>
            </div>
            <br />
          </div>
          <form
            className="needs-validation"
            onSubmit={/*(event) => this.onSubmit(event)*/(event) => history.push("/")}
          >

            <div className="row">
              <div className="col-md-12">
                <div align="left" style={{ width: 250, fontFamily: "Courier New"}}>Username</div>
                <label className="text-dark">
                  <input
                    type="text"
                    style={{ width: 250 }}
                    name="userName"
                    required
                    onChange={(e) => {
                      this.setState({ userName: e.target.value });
                    }}
                  />
                </label>
              </div>
              <br />
              <div className="col-md-12">
              <div align="left" style={{ width: 250, fontFamily: "Courier New"}} >Password</div>
                <label className="text-dark">
                  <input
                    type="password"
                    style={{ width: 250 }}
                    name="password"
                    required
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <br />
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-outline-dark"
                  style={{ fontFamily: "Courier New" }}
                >
                  sign up
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </form>
          <br />
        </div>
      </div>
    );
  }

 /*onSubmit = async (event) => {
    //event.preventDefault();
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

export default RegisterCard;
