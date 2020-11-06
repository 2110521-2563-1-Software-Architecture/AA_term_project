import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import Axios from "axios"

import UserContext from "../utils/context/userContext"

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 500px;
  height: 39;

  h1 {
    margin-top: 14px;
    color: white;
  }

  .label {
    margin-top: 20px;
    font-size: 20px;
    color: white;
  }

  .btn {
    width: 80px;
    height: 36px;
    margin-top: 8px;
    font-size: 16px;
    cursor: pointer;
    background-color: #FE7F2D;
    border-radius: 5px;
    color: white;
    border: 2px solid black;
  }
`

const UserForm = (props) => {

  const history = useHistory()

  const { userToken, setUserToken } = useContext(UserContext)

  useEffect(() => {
    
    const getUserInfo = async () => {

      // const res = await Axios.get("http://aa-shortener.poomrokc.services/api/user/whoami",
      //   { headers: { token: userToken } }
      // )

    }

    getUserInfo()
  }, [])

  const handleLogOut = () => {

    setUserToken(undefined)
    localStorage.setItem("token", '')

    history.push('/')
    props.onSet("guest")
  }

  return (
    <UserWrapper>
      <h1>H</h1>
      <h6 className="label">Rattapong Whangthamrongwit</h6>
      <button onClick={handleLogOut} className="btn">
        Log out
      </button>
    </UserWrapper>
  );
};

export default UserForm;
