import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import { useHistory } from "react-router-dom"

import '../components/RegisterCard.css'
import Logo from '../../assets/newlogo.png'

import UserContext from "../utils/context/userContext"

const RegisterCard = () => {

  const history = useHistory()

  useEffect(() => {
   
    let status = localStorage.getItem("register-status")
    let token = localStorage.getItem("token")
    if (status === null) {
      localStorage.setItem("register-status", "")
      status = ""
    }
    if (token === null) {
      localStorage.setItem("token", "")
      token = ""
    }

    if (status || token) {
      history.push("/")
    }

    return () => {
      localStorage.setItem("register-status", "")
    }
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")

  const { setUserToken } = useContext(UserContext)

  const onSubmit = async (email, password) => {
    
    if(password != confirmpassword){
      document.getElementById("errorpass").style.display = "block";
      return false;
    }
    else{
      document.getElementById("errorpass").style.display = "none";
    }

    const newUser = {
      email,
      password
    }

    localStorage.setItem("register-status", "value")
    
    const res = await Axios
                        .post("http://aa-shortener.poomrokc.services/api/public/register", newUser)  
    const { status, data: { token } } = res
    
    if (status === 409){
      document.getElementById("emailerror").style.display = "block";
      return false;
    }

    else if (status === 200) {
      setUserToken(token)
      localStorage.setItem("token", token)
    }

  }

    return (
      <div className="container-fluid">
        <div className="row regpage">
          <div className="col-sm-8 offset-sm-2">
              <div className="logoimg">
                <a href="/"><img className="logostyle" src={Logo}/></a>
              </div>
              <div className="Card kfont">
                <div className="register">
                  Register
                </div>
                <form className="needs-validation">
                <div className="regtitle">
                  Email <span className="errorpass" id="emailerror">Already Registered</span>
                </div>
                <div className="reginput">
                  <input type="email" name="email" className="reginputstyle" onChange={(e) => {setEmail(e.target.value);}} required/>
                </div>
                <div className="regtitle">
                  Password
                </div>
                <div className="reginput">
                  <input type="password" name="password" id="password" className="reginputstyle"  onChange={(e) => {setPassword(e.target.value);}} required/>
                </div>
                <div className="regtitle">
                  Confirm password <span className="errorpass" id="errorpass">Password does not match</span>
                </div>
                <div className="reginput">
                  <input type="password" name="confirmpassword" id="conpass" className="reginputstyle" onChange={(e) => {setConfirmPassword(e.target.value);}} required/>
                </div>
                <div className="text-center">
                  <input type="button" className="regbtn" value="Submit" onClick={() => onSubmit(email,password)}/>
                </div>
                </form>
              </div>
          </div>
        </div>
      </div>
    );

}

export default RegisterCard;