import React, { useState } from "react";
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
      margin-bottom: .2rem;
      font-size: 16px;
      color: white;
    }

    .login-label {
      margin-top: 15px;
      font-size: 16px;
      color: #FFD942;
      cursor: pointer;
      margin-left: -20px;
    }

    .input {
      width: 120px;
      height: 18px;
    }

    .btn {
      width: 80px;
      height: 36px;
      margin-top: 8px;
      font-size: 16px;
      cursor: pointer;
      background-color: #FFD942;
      border-radius: 5px;
    }
  `

const GuestLoginForm = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearValue = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = (email, pass) => {
    if (email === "great" && pass === "123") {
      props.onSet("user");
    }
    clearValue();
  };

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
          signIn(email, password);
        }}
        className="login-label"
      >
        sign in
      </h5>
      <button onClick={() => props.onSet("skip")} className="btn">
        sign up
      </button>
    </GuestFormWrapper>
  );
};

export default GuestLoginForm;
