import React, { useState } from "react";

import "../styles.css";

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
    <div className="nav-sign-form">
      <div className="nav-input-form">
        <div className="nav-form">
          <h6 className="nav-label">email</h6>
          <input
            className="nav-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="nav-form">
          <h6 className="nav-label">password</h6>
          <input
            className="nav-input"
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
      <button onClick={() => props.onSet("skip")} className="sign-up-btn">
        sign up
      </button>
    </div>
  );
};

export default GuestLoginForm;
