import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"

import Card from "../components/HistoryCard"

const Wrapper = styled.div`

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 5rem;

`

const HistoryPage = () => {

  const history = useHistory()
  const [data, setData] = useState([])

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      history.push('/')
    }
    else {

      const getUrl = async () => {

        const JwtToken = `JWT ${localStorage.getItem("token")}`

        const { data: { urls } } = await Axios.get("http://aa-shortener.poomrokc.services/api/user/urls", { headers: { Authorization: JwtToken } })

        setData(urls)
      }
  
      getUrl()
    }
  }, [])

  return (
    <div>
      {
        data ? 
          <Wrapper>{data.map((info, index) => <Card data={{info, index}} />)}</Wrapper>
        : 
          <div>H</div>
      }
    </div>
  )
}

export default HistoryPage;