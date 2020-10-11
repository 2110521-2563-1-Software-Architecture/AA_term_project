import React, { useState } from "react";
import GuestLoginForm from "./GuestLoginForm";
import UserForm from "./UserForm";
import SkipForm from "./SkipForm";

import "../style.css";

const Navbar = () => {
  const [state, setState] = useState("skip");

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
    <div className="nav-background">
      <div className="nav-wrapper">
        <h1> jj </h1> {/* This is logo */}
        {selectState(state)}
      </div>
    </div>
  );
};

export default Navbar;
