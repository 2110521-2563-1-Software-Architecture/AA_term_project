import React, { useState } from "react";
import GuestLoginForm from "./GuestLoginForm";
import UserForm from "./UserForm";
import SkipForm from "./SkipForm";
import Logo from '../../assets/logo.png'
import "../styles.css";

const Navbar = () => {
  const [state, setState] = useState("guest");

  const selectState = (st) => {
    switch (st) {
      case "guest":
        return <GuestLoginForm onSet={setState} />;
      case "user":
        return <UserForm onSet={setState} />;
      case "sign-up":
        return <GuestLoginForm onSet={setState} />;
      case "skip":
        return <SkipForm onSet={setState} />;
      default:
        break;
    }
  };

  return (
    <div className="nav-background">
      <div className="nav-wrapper">
        <img className="logo-img" src={Logo}/>
        {selectState(state)}
      </div>
    </div>
  );
};

export default Navbar;
