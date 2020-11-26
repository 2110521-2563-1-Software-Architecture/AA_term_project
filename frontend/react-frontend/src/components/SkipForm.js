import React, { useState, useContext, useEffect } from "react";
import UrlContext from "../utils/context/urlContext"
import styled from 'styled-components'

const SkipWrapper = styled.div`
  align-items: center;
  justify-content: center;
  margin-right: 2rem;

  .btn {
    width: 80px;
    height: 36px;
    margin-top: 8px;
    font-size: 16px;
    cursor: ${props => props.skip ? 'pointer' : 'cursor'};
    background-color: #FFD942;
    border-radius: 5px;
  }
`

const SkipForm = () => {
  const [count, setCount] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [label, setLabel] = useState("");

  const { url_redirect } = useContext(UrlContext)

  const timer = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setCount((prev) => prev - 1);
        resolve();
      }, 1000);
    });
  };

  const clearCondition = () => {
    setCanSkip(true);
    setCount(5);
    setLabel("Skip");
  };

  useEffect(() => {
    const sleep = async () => {
      for (let i = 0; i < 5; i++) {
        await timer();
      }
      clearCondition();
    }
    
    sleep()
  }, [])

  const getSkip = async () => {
    window.location.href = url_redirect
  };

  return (
    <SkipWrapper skip={canSkip}>
      <button disabled={!canSkip} onClick={() => getSkip()} className="btn">
        {canSkip ? label : count}
      </button>
    </SkipWrapper>
  );
};

export default SkipForm;
