import React from "react";

import "../styles.css";

const UserForm = (props) => {
  return (
    <div className="nav-sign-form">
      <h1>H</h1>
      <h6 className="nav-label-user">Rattapong Whangthamrongwit</h6>
      <button onClick={() => props.onSet("guest")} className="sign-up-btn">
        Log out
      </button>
    </div>
  );
};

export default UserForm;
