import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"
import GuestLoginForm from "./GuestLoginForm";
import styled from "styled-components"

import UserForm from "./UserForm";
import SkipForm from "./SkipForm";
import Logo from '../../assets/newlogo.png'
import LogoPro from '../../assets/newlogo_pro.png'
import "../styles.css"
import StateContext from "../utils/context/stateContext"


const NavbarWrapper = styled.div`
  font-family: Roboto;
  height: 64px;
  background-color: #2F4F4F;

  .element-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    margin-left: 3rem;
    margin-right: 1rem;
  }

  .logo-img {
    height: 55px;
    font-family: sans-serif;
    margin-left: 10;
    cursor: pointer;
  }

`

const Navbar = props => {

  const { state, setState } = useContext(StateContext)
  const userToken = localStorage.getItem('token')

  const history = useHistory()
  const { pathname } = useLocation()

  const homePageRedirect = () => {
    history.push("/")
    const st = userToken ? "user" : "guest"
    setState(st)
  }

  const handleStateOnRedirect = () => {

    console.log(pathname)
    console.log(userToken)

    if (userToken !== "" ) {
      console.log('user')
      switch (pathname) {
        case '/':
          setState("user")
          break
        case '/register':
          setState("user")
          break
        case '/redirect':
          setState("user")
          break
        case '/history':
          setState("user")
          break
        case '/ads':
          setState('skip')
          break
      }
    } else {
      console.log('guest')
      switch (pathname) {
        case '/':
          setState("guest")
          break
        case '/register':
          setState("sign-up")
          break
        default:
          setState("skip")
          break
      }
    }

  }

  useEffect(() => {

    handleStateOnRedirect()

  }, [pathname])

  const selectState = (st) => {
    switch (st) {
      case "guest":
        return <GuestLoginForm onSet={setState} />;
      case "user":
        return <UserForm onSet={setState} />;
      case "sign-up":
        return null;
      case "skip":
        return <SkipForm onSet={setState} />;
      default:
        break;
    }
  };

  return (
    <NavbarWrapper>
      <div className="element-wrapper">
        {state=='sign-up'? <img/>
              : state=='user'?<img onClick={homePageRedirect} className="logo-img" src={LogoPro}/>:<img onClick={homePageRedirect} className="logo-img" src={Logo}/> }
        
        {selectState(state)}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
