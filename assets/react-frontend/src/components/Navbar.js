import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import GuestLoginForm from "./GuestLoginForm";
import styled from "styled-components"

import UserForm from "./UserForm";
import SkipForm from "./SkipForm";
import Logo from '../../assets/newlogo.png'
import "../styles.css"
import StateContext from "../utils/context/stateContext"
import UserContext from "../utils/context/userContext"
import PrevStateContext from "../utils/context/prevStateContext"
import keyContext from "../utils/context/keyContext"

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

const Navbar = () => {

  const { state, setState } = useContext(StateContext)
  const { prevState, setPrevState } = useContext(PrevStateContext)
  const { userToken } = useContext(UserContext)

  const history = useHistory()

  const homePageRedirect = () => {
    history.push("/")
    const st = userToken ? "user" : "guest"
    setState(st)
  }

  const { locationKeys, setLocationKeys } = useContext(keyContext)
  
  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([ location.key ])
      }
  
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
          setState(prevState)
        } else {
          setLocationKeys((keys) => [ location.key, ...keys ])
          setState(prevState)
        }
      }
    })
  }, [ locationKeys, ])

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
        <img onClick={homePageRedirect} className="logo-img" src={Logo}/>
        {selectState(state)}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
