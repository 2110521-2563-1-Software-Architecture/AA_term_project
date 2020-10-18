import React, { useState } from "react";
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
    cursor: pointer;
    background-color: #FFD942;
    border-radius: 5px;
  }
`

const SkipForm = (props) => {
  const [count, setCount] = useState(5);
  const [isSkip, setIsSkip] = useState(false);
  const [label, setLabel] = useState("skip");
  const [isClicked, setIsClicked] = useState(false);

  const timer = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setCount((prev) => prev - 1);
        resolve();
      }, 1000);
    });
  };

  const clearCondition = () => {
    setIsSkip(false);
    setCount(5);
    setLabel("Done!");
    setIsClicked(false);
  };

  const getSkip = async () => {
    if (!isClicked && label === "skip") {
      setIsClicked(true);
      setIsSkip(true);
      for (let i = 0; i < 5; i++) {
        await timer();
      }
      clearCondition();
    } else if (label === "Done!") {
      props.onSet("user");
    }
  };

  return (
    <SkipWrapper>
      <button onClick={() => getSkip()} className="btn">
        {isSkip ? count : label}
      </button>
    </SkipWrapper>
  );
};

export default SkipForm;
