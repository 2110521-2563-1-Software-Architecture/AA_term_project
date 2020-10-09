import React, { useState } from "react";

import "../styles.css";

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
    <div className="nav-wrapper">
      <button onClick={() => getSkip()} className="sign-up-btn">
        {isSkip ? count : label}
      </button>
    </div>
  );
};

export default SkipForm;
