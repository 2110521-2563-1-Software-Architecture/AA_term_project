import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"
import GuestLoginForm from "./GuestLoginForm";
import styled from "styled-components"

import UserForm from "./UserForm";
import SkipForm from "./SkipForm";
import Logo from '../../assets/newlogo.png'
import "../styles.css"
import StateContext from "../utils/context/stateContext"
import UserContext from "../utils/context/userContext"

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

  @media (max-width: 820px) {
    position: fixed;
    width: 100%;
    z-index: 2;
  }

`

const Navbar = () => {

  const { state, setState } = useContext(StateContext)
  const { userToken } = useContext(UserContext)

  const history = useHistory()
  const { pathname } = useLocation()

  const homePageRedirect = () => {
    history.push("/")
    const st = userToken ? "user" : "guest"
    setState(st)
  }

  const handleStateOnRedirect = () => {

    if (userToken) {
      setState("user")
    } else {

      switch (pathname) {
        case '/':
          setState("guest")
          break
        case '/register':
          setState("sign-up")
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
              : <img onClick={homePageRedirect} className="logo-img" src={Logo}/> }
        
        {selectState(state)}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
