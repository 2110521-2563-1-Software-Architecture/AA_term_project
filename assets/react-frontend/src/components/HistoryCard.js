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
      bottom: 2.6rem;
      margin-top: 152px;
      border-top: none;
      width: 101%;
      height: 50px;
      outline: hidden;
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      cursor: pointer;

      :hover {
          background-color: #fe7f2d;
          border: 2px solid black
      }
  }

`

const HistoryCard = props => {

    const handle = () => {
        console.log(props)
    }

    const { target_url, visit_count, created, name = "Anonymous" } = props.data

    return (
        <Wrapper>
            <img src={logo} />
            <div className="data-wrap">
                <h6>ID: {created}</h6>
                <h6>URL: {target_url}</h6>
                <h6>Name: {name}</h6>
                <h6>Visited Count: {visit_count}</h6>
            </div>
            <div className="foot" onClick={handle}>Del</div>
        </Wrapper>
    )
}

export default HistoryCard