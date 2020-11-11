import React from "react"
import styled from "styled-components"

import logo from "../../assets/newlogo.png"

const Wrapper = styled.div`

  border: 2px solid black;
  border-radius: 2rem;
  min-width: 300px;
  width: 300px;
  text-align: center;
  height: 400px;
  margin: 2rem;
  box-sizing: border-box;

  img {
      position: relative;
      left: -1px;
      top: -1px;
      width: 300px;
      height: 90px;
      background-color: #2F4F4F;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
      background-size: cover;
  }

  .data-wrap {

      padding-top: 3rem;
  }

  .foot {
      position: relative;
      right: 1px;
      bottom: 70.3px; // increase here to let button goes up
      margin-top: 152px;
      border-top: none;
      width: 101%;
      height: 50px;
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      cursor: pointer;

      :hover {
          background-color: #fe7f2d;
          border: 2px solid black
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

`

const HistoryCard = props => {

    const handle = () => {
        console.log(props)
    }

    const { index } = props.data
    const { target_url, visit_count, created, domain } = props.data.info
    let { name } = props.data.info
    if (!name) {
        name = "Anonymous"
    }

    return (
        <Wrapper fadeInDuration={`${index}s`}>
            <img src={logo} />
            <div className="data-wrap">
                <h6>ID: {created}</h6>
                <h6>URL: {target_url}</h6>
                <h6>Name: {name}</h6>
                <h6>Domain: {domain}</h6>
                <h6>Visited Count: {visit_count}</h6>
            </div>
            <div className="foot" onClick={handle}>Del</div>
        </Wrapper>
    )
}

export default HistoryCard