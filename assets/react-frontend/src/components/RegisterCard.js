import React from "react";
//import history from "../history";
//import Util from "../api/Util";

class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      Email: "",
      phoneNumber: "",
    };
  }

  render() {
    return (
      <div className="Card " style={{ width: 750 }}>
        <div className="Card " style={{ width: 750 }}>
          <br />
        </div>
        <div
          className="Card box"
          style={{ width: 750, border: "thick solid black" }}
        >
          <br />
          <div className="row">
            <div className="col-md-12 ">
              <h2 className="card-title" style={{ fontFamily: "Courier New" }}>
                Register
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
                <br />
                <label className="text-dark">
                  First Name
                  <br />
                  <input
                    type="text"
                    style={{ width: 250 }}
                    name="firstName"
                    required
                    onChange={(e) => {
                      this.setState({ firstName: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="col-md-4">
                <br />
                <label className="text-dark">
                  Last Name
                  <br />
                  <input
                    type="text"
                    style={{ width: 250 }}
                    name="lastName"
                    required
                    onChange={(e) => {
                      this.setState({ lastName: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <label className="text-dark">
                  User Name
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
              <div className="col-md-4">
                <label className="text-dark">
                  password
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
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <label className="text-dark">
                  Email
                  <input
                    placeholder="user1@gmail.com"
                    type="email"
                    style={{ width: 250 }}
                    name="Email"
                    required
                    onChange={(e) => {
                      this.setState({ Email: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="col-md-4">
                <label className="text-dark">
                  Phone Number
                  <input
                    placeholder="0920257845"
                    type="tel"
                    style={{ width: 250 }}
                    name="phoneNumber"
                    required
                    onChange={(e) => {
                      this.setState({ phoneNumber: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="col-md-2"></div>
            </div>
            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-2">
                <br />
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-outline-dark"
                >
                  Register
                </button>
              </div>
              <div className="col-md-5"></div>
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
      this.state.firstName,
      this.state.lastName,
      this.state.userName,
      this.state.password,
      this.state.Email,
      this.state.phoneNumber
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
