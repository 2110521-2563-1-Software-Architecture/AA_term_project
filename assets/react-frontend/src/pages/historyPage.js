import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"

import Card from "../components/HistoryCard"
import EmptyFile from "../../assets/empty-file.png"

const Wrapper = styled.div`

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 5rem;

`

const EmptyWrapper = styled.div`

  text-align: center;
  
  h1 {
    margin-top: 5rem;
  }

  img {
    margin-top: 3rem;
    width: 300px;
  }

  h2 {
    margin-top: 2rem;
  }

  span {
    cursor: pointer;
    color: blue;

    :hover {
      color: #fe7f2d;
      text-decoration: underline;
    }
  }

`

const HistoryPage = () => {

  const history = useHistory()
  const [data, setData] = useState([])
  const [state, setState] = useState(false)

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      history.push('/')
    }
    else {

      const getUrl = async () => {

        try {
          const JwtToken = `JWT ${localStorage.getItem("token")}`

          const { data: { urls } } = await Axios.get("http://aa-shortener.poomrokc.services/api/user/urls", { headers: { Authorization: JwtToken } })

          setData(urls)
        } catch (error) {
          console.log(error.message)
        }
      }
  
      getUrl()
    }
  }, [state])

  const goHome = () => {
    history.push('/')
  }

  return (
    <div>
      {
        (data.length !== 0) ? 
          <Wrapper>{data.map((info, index) => <Card onSet={setState} data={{info, index}} />)}</Wrapper>
        : 
          <EmptyWrapper>
            <h1>Oh! Your history is empty!</h1>
            <img src={EmptyFile} />
            <h2>Looking for some url? Go shorten it <span onClick={goHome}>Now!</span></h2>
          </EmptyWrapper>
      }
    </div>
  )
}

export default HistoryPage;