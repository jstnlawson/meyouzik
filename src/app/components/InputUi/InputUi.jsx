import React, { useState, useEffect } from "react";
import "./InputUi.css";

const InputUi = () => {
  const [position, setPosition] = useState("middle");

  const autoPositionSlider = () => {
    const slider = document.querySelector('input[type="range"]');
    const value = slider.value;
    let newPosition;

    if (value <= 33) {
      newPosition = "left";
      slider.value = 5;
    } else if (value >= 67) {
      newPosition = "right";
      slider.value = 95;
    } else {
      newPosition = "middle";
      slider.value = 50;
    }

    setPosition(newPosition);
  };

  useEffect(() => {
    autoPositionSlider();
  }, []);

  return (
    <div className="flex input-ui__container p-2">
      <div className="flex flex-col justify-center items-center px-4 py-1 ">
        <div className="flex input-label__container">
          {/* <div className='input-label__one'>1</div> */}
          <div className="input-label__two">2</div>
          {/* <div className='input-label__three'>3</div> */}
        </div>
        <div className="mb-1 flex justify-bottom bracket-div__container">
          <div className="input-label__one">1</div>
          <div className="bracket-div__one"></div>
          <div className="bracket-div__two"></div>
          <div className="bracket-div__three"></div>
          <div className="bracket-div__four"></div>
          <div className="input-label__three">3</div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={autoPositionSlider} // Use onChange instead of onClick
          className="slider"
        />
        <span className="text-black text-[.55rem] mt-1">INPUT</span>
      </div>

      <div className="flex btn-container">
        <button className="btn">
            <span className="record-btn">rec</span>
        </button>
        <button className="btn">
            <span className="stop-btn">stop</span>
        </button>
        <button className="btn">
            <span className="play-btn">play</span>
        </button>
      </div>

    </div>
  );
};

export default InputUi;
