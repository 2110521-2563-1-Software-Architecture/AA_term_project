import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import "../styles.css";

const GuestFormWrapper = styled.div`
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
  `

const GuestLoginForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearValue = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignIn = (email, pass) => {
    if (email === "great" && pass === "123") {
      props.onSet("user");
    }
    clearValue();
  };

  const history = useHistory()

  const handleSignUp = () => {
    history.push("/register")  
    props.onSet("sign-up")
  }

  return (
    <GuestFormWrapper>
      <div className="input-form">
        <div>
          <h6 className="label">email</h6>
          <input
            className="input"
            type="text"
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
      <h5
        onClick={() => {
          handleSignIn(email, password);
        }}
        className="login-label"
      >
        sign in
      </h5>
      <button onClick={() => handleSignUp()} className="btn">
        sign up
      </button>
    </GuestFormWrapper>
  );
};

export default GuestLoginForm;
