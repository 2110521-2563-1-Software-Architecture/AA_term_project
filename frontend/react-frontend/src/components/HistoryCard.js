import React from "react"
import styled from "styled-components"
import Axios from "axios"

import logo from "../../assets/newlogo.png"

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700&display=swap');
  border: 2px solid black;
  border-radius: 2rem;
  min-width: 350px;
  width: 350px;
  text-align: center;
  height: 450px;
  margin: 2rem;
  box-sizing: border-box;
  background-color: #f1f1f1;

  img {
      position: relative;
      left: -1px;
      top: -1px;
      width: 349px;
      height: 90px;
      background-color: #2F4F4F;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
      background-size: cover;
  }

  .flex-wrap {
      display: flex;
      justify-content: space-between;
      margin: 0 1rem;
    
    .flex-label {
        font-family:'Kanit',sans-serif;  
        font-weight: bold;
    }

    .flex-value {
        font-family:'Kanit',sans-serif;  
        margin-right: 10px;
    }

  }

  .data-wrap {
      padding-top: 3rem;
  }

  .foot {
      position: relative;
      right: 1px;
      bottom: 28px; // increase here to let button goes up
      margin-top: 152px;
      border-top: none;
      width: 101%;
      height: 50px;
      line-height:30px;
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      font-family:'Kanit',sans-serif;  
      cursor: pointer;

      :hover {
          visibility:visible;
          background-color: red;
          border: 2px solid black;
          color: white;
      }
  }

  animation: fadein ${props => props.fadeInDuration};

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  :hover {

    position: relative;
    top: -20px;

  }

`

const HistoryCard = props => {

    const handle = async () => {
        
        try {

            const JwtToken = `JWT ${localStorage.getItem('token')}`
            const res = await Axios.delete(`http://aa-shortener.poomrokc.services/api/user/urls/${hash}`, { headers: { Authorization: JwtToken } })

            props.onSet(prev => !prev)

        } catch (error) {
            console.log(error)
        }

    }

    const { index } = props.data
    const { target_url, visit_count, created, domain, hash } = props.data.info
    let { name } = props.data.info
    if (!name) {
        name = "Anonymous"
    }

    return (
        <Wrapper fadeInDuration={`${index}s`}>
            <img src={logo} />
            <div className="data-wrap">
                <div className="flex-wrap">
                    <h6 className="flex-label">ID:</h6>
                    <h6 className="flex-value">{created}</h6>
                </div>
                <div className="flex-wrap">
                    <h6 className="flex-label">URL:</h6>
                    <h6 className="flex-value">{target_url}</h6>
                </div>
                <div className="flex-wrap">
                    <h6 className="flex-label">NAME:</h6>
                    <h6 className="flex-value">{name}</h6>
                </div>
                <div className="flex-wrap">
                    <h6 className="flex-label">DOMAIN:</h6>
                    <h6 className="flex-value">{domain}</h6>
                </div>
                <div className="flex-wrap">
                    <h6 className="flex-label">VISITED:</h6>
                    <h6 className="flex-value">{visit_count}</h6>
                </div>
            </div>
            <div className="foot" onClick={handle}>Delete</div>
        </Wrapper>
    )
}

export default HistoryCard