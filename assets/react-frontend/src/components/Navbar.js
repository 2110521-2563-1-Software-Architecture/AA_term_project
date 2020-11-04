import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import GuestLoginForm from "./GuestLoginForm";
import UserForm from "./UserForm";
import SkipForm from "./SkipForm";
import Logo from '../../assets/newlogo.png'
import styled from "styled-components"
import "../styles.css"

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

@media (max-width: 650px) {
  height: 96px;
  .element-wrapper {
    flex-direction: column;
  }
}
`

const Navbar = () => {
  const [state, setState] = useState("guest");

  const history = useHistory()

  const homePageRedirect = () => {
    history.push("/")
  }

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
