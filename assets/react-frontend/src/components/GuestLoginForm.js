import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import Axios from "axios"

import UserContext from "../utils/context/userContext"
import "../styles.css";

const GuestFormWrapper = styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 500px;
    height: 39;

    .input-form {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 60%;
    }

    .label {
      margin-bottom: 0.05rem;
      font-size: 17px;
      font-family: 'Times New Roman';
      color: white;
    }

    .login-label {
      margin-top: 24px;
      font-size: 18px;
      color: #FE7F2D;
      cursor: pointer;
      margin-left: -20px;
    }

    .input {
      width: 120px;
      height: 21px;
      padding-left: 3px;
    }

    .btn {
      width: 80px;
      height: 36px;
      margin-top: 8px;
      font-size: 16px;
      color:white;
      cursor: pointer;
      background-color: #FE7F2D;
      border-radius: 5px;
      border: 2px solid black;
    }

    @media (max-width: 815px) {
      display: none;
      position: fixed;
      background-color: #2F4F4F;
      flex-direction: column;
      z-index: 2;
      top: 0%;
      right: 0%;
      height: 100vh;
      width: 100%;

      .input-form {
        flex-direction: column;
      }
    }
  `

const Hambergur = styled.div`
  display: none;
  margin-right: 20px;
  cursor: pointer;
  
  .line {
    margin-top: 5px;
    width: 30px;
    height: 3px;
    background: white
  }

  @media (max-width: 815px) {
    display: inline-block;
  }
`

const GuestLoginForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearValue = () => {
    setEmail("");
    setPassword("");
  };

  const { setUserToken } = useContext(UserContext)

  const handleSignIn = async (email, pass) => {
    
    try {

      const userInfo = {
        email,
        password: pass
      }
  
      const res = await Axios.post("http://aa-shortener.poomrokc.services/api/public/login", userInfo)
      const { status, data: { token } } = res
  
      if (status === 200) {
        setUserToken(token)
        localStorage.setItem("token", token)
        props.onSet("user");
        history.push("/")
      }

    } catch (err) {
      console.log(err.message)
    }
    clearValue();
  };

  const history = useHistory()

  const handleSignUp = () => {
    history.push("/register")  
    props.onSet("sign-up")
  }

  return (
    <>
      <GuestFormWrapper>
        <div className="input-form">
          <div>
            <h6 className="label">email</h6>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h6 className="label">password</h6>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
<<<<<<< HEAD
      </div>
      <h5
        onClick={() => handleSignIn(email, password)}
        className="login-label"
      >
        sign in
      </h5>
<<<<<<< HEAD
      <button onClick={() => props.onSet("sign-up")} className="sign-up-btn">
=======
      <button onClick={() => handleSignUp()} className="btn">
>>>>>>> make redirect to home and sign-up page logic
        sign up
      </button>
    </GuestFormWrapper>
=======
        <h5
          onClick={() => handleSignIn(email, password)}
          className="login-label"
        >
          sign in
        </h5>
        <button onClick={() => handleSignUp()} className="btn">
          sign up
        </button>
      </GuestFormWrapper>
      <Hambergur>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </Hambergur>
    </>
>>>>>>> adjust responsive navbar
  );
};

export default GuestLoginForm;
