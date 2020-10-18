import React from "react";
import styled from "styled-components";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 500px;
  height: 39;

  .label {
    margin-top: 10px;
    font-size: 20px;
    color: white;
  }

  .btn {
    width: 80px;
    height: 36px;
    margin-top: 8px;
    font-size: 16px;
    cursor: pointer;
    background-color: #FFD942;
    border-radius: 5px;
  }
`

const UserForm = (props) => {
  return (
    <UserWrapper>
      <h1>H</h1>
      <h6 className="label">Rattapong Whangthamrongwit</h6>
      <button onClick={() => props.onSet("guest")} className="btn">
        Log out
      </button>
    </UserWrapper>
  );
};

export default UserForm;
