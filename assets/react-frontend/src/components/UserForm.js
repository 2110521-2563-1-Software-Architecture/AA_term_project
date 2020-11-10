import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import Axios from "axios"

import UserContext from "../utils/context/userContext"
import User from "../../assets/user.png"

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 500px;
  height: 39;

  .label {
    margin-top: 18px;
    font-size: 20px;
    color: white;
  }

  img {
    width: 50px;
    cursor: pointer
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

  @media (max-width: 700px) {

    img {
     
    }

    .label {
      display: none;
    }

  }
`

const UserForm = (props) => {

  const history = useHistory()

  const { userToken, setUserToken } = useContext(UserContext)
  const [name, setName] = useState("")

  useEffect(() => {
    
    const getUserInfo = async () => {

      const jwtToken = `JWT ${userToken}`
      
      const { data: { user: { email } } } = await Axios.get("http://aa-shortener.poomrokc.services/api/user/whoami",
        { headers: { Authorization: jwtToken } }
      )

      setName(email)
    }

    getUserInfo()
  }, [])

  const handleLogOut = () => {

    setUserToken(undefined)
    localStorage.setItem("token", '')

    history.push('/')
    props.onSet("guest")
  }

  const viewProfile = () => {
    history.push('/history')
  }

  return (
    <UserWrapper>
      <img onClick={viewProfile} src={User} />
      <h6 className="label">{name}</h6>
      <button onClick={handleLogOut} className="btn">
        Log out
      </button>
    </UserWrapper>
  );
};

export default UserForm;
