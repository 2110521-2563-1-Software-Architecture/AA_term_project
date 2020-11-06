import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import { useHistory } from "react-router-dom"

import '../components/RegisterCard.css'
import Logo from '../../assets/logo.png'
import UserContext from "../utils/context/userContext"

const RegisterCard = () => {

  const history = useHistory()

  useEffect(() => {
   
    let status = localStorage.getItem("register-status")
    if (status === null) {
      localStorage.setItem("register-status", "")
      status = ""
    }

    if (status) {
      history.push("/")
    }

    return () => {
      localStorage.setItem("register-status", "")
    }
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUserToken } = useContext(UserContext)

  const onSubmit = async (email, password) => {
    
    const newUser = {
      email,
      password
    }

    localStorage.setItem("register-status", "value")
    
    const res = await Axios
                        .post("http://aa-shortener.poomrokc.services/api/public/register", newUser)  
    const { status, data: { token } } = res
  
    if (status === 200) {
      setUserToken(token)
      localStorage.setItem("token", token)
    }

  }

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
            onSubmit={() => onSubmit(email, password)}
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
                      setEmail(e.target.value);
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
                      setPassword(e.target.value);
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

export default RegisterCard;