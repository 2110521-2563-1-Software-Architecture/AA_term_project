import React, { useState } from "react";
import GuestLoginForm from "../components/guest-login";
import UserForm from "../components/user-nav";
import SkipForm from "../components/skip-nav";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [state, setState] = useState("guest");

  const selectState = (st) => {
    switch (st) {
      case "guest":
        return <GuestLoginForm onSet={setState} />;
      case "user":
        return <UserForm onSet={setState} />;
      case "sign-up":
        return <h1>sign</h1>;
      case "skip":
        return <SkipForm onSet={setState} />;
      default:
        break;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/register"}>positronX.io</Link>
          {selectState(state)}
        </div>
    </nav>

  );
};

export default Navbar;
