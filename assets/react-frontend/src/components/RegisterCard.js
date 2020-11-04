import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"

import history from "../history";
import '../components/RegisterCard.css'
import Logo from '../../assets/logo.png'
import UserContext from "../utils/context/userContext"

class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  // componentDidMount() {
  //   const { userToken, setUserToken } = this.context
  //   console.log(userToken)
  // }

  async onSubmit(e) {
    
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    
    const res = await Axios.post("http://aa-shortener.poomrokc.services/api/public/register", newUser)
    
    const { status, data: { token } } = res
    const { setUserToken } = this.context
    
    if (status === 200) {
      setUserToken(token)
      localStorage.setItem("token", token)
    }
    history.push("/")
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
            onSubmit={(e) => this.onSubmit(e)}
          >

            <div className="row">
              <div className="col-md-12">
                <div align="left" style={{ width: 250, fontFamily: "Courier New"}}>Email</div>
                <label className="text-dark">
                  <input
                    type="text"
                    style={{ width: 250 }}
                    name="email"
                    required
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
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

}

RegisterCard.contextType = UserContext

export default RegisterCard;
