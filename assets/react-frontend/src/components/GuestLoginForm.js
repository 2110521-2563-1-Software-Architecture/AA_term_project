import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import Axios from "axios"

import UserContext from "../utils/context/userContext"
import "../styles.css";

const GuestFormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 500px;
    height: 100%;
    margin-right: 24px;

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

    .input {
      width: 120px;
      height: 21px;
      padding-left: 3px;
    }

    .btn-wrapper {
      
      height: 100%;
      display: flex;

      .btn {
        width: 80px;
        border-radius: unset;
        padding-top: 16px;
        font-size: 16px;
        color:white;
        cursor: pointer;
        background-color: #2F4F4F;

        :hover {
            background-color: #fe7f2d;
        }
      }

    }

    @media (max-width: 820px) {
      position: fixed;
      background-color: #2F4F4F;
      flex-direction: column;
      z-index: 2;
      top: 0%;
      right: -5%;
      height: 100vh;
      width: 110%;
      clip-path: ${props => props.open ? 'circle(100px at 90% -15%)' : 'circle(1200px at 90% -15%)'};
      -webkit-clip-path: ${props => props.open ? 'circle(100px at 90% -15%)' : 'circle(1200px at 90% -15%)'};
      transition: all 2s ease;
      
      .input-form {
        flex-direction: column;
        margin-top: 10rem;
        margin-bottom: 5rem;
      
        .input-element {
          margin-top: 2rem;
          opacity: 0;
        }

        .input-element-open {
          transition: all 1s ease 0.8s;
          opacity: 1;
        }

        .input-element-open2 {
          transition: all 1s ease 1.2s;
          opacity: 1;
        }

        .label {
          margin-bottom: .5rem;
          font-size: 24px;
        }

        .input {
          height: 30px;
          width: 100%;
        }
      }

      .btn-wrapper {
        flex-direction: column;
        width: 100%;
        opacity: 0;

        .btn {
          width: 100%;
          margin-top: 1rem;
          font-size: 24px;
        }
      }

      .btn-wrapper-open {
        transition: all 1s ease 1.7s;
        opacity: 1
      }
    }
  `

const Hambergur = styled.div`
  display: none;
  margin-right: 24px;
  cursor: pointer;
  z-index: 3;
  
  .line {
    margin-top: 5px;
    width: 30px;
    height: 3px;
    background: white
  }


  @media (max-width: 820px) {
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

  const openNav = () => {
    setIsOpen(!isOpen)

    const input_ele = document.querySelectorAll(".input-element")
    const btn_ele = document.querySelectorAll(".btn-wrapper")

    input_ele[0].classList.toggle('input-element-open')
    input_ele[1].classList.toggle('input-element-open2')

    btn_ele[0].classList.toggle('btn-wrapper-open')
    //btn_ele[1].classList.toggle('btn-element-open2')

  }

  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <GuestFormWrapper open={isOpen}>
        <div className="input-form">
          <div className="input-element">
            <h6 className="label">email</h6>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-element">
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
=======
        <div className="btn-wrapper">
          <button className="btn" onClick={() => handleSignIn(email, password)}>sign in</button>
          <button className="btn" onClick={handleSignUp}>sign up</button>
        </div>
>>>>>>> change style for button in navbar
      </GuestFormWrapper>
      <Hambergur id="hambergur" onClick={openNav}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </Hambergur>
    </>
>>>>>>> adjust responsive navbar
  );
};

export default GuestLoginForm;