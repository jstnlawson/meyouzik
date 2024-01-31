import React, { useState, useEffect } from "react";
import "./Controls.css";

const controls = ({
  isSpinning,
  setIsSpinning,
  isRecording,
  setIsRecording,
}) => {
  const [position, setPosition] = useState("middle");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRecordBtn = () => {
    setIsRecording(true);
    setIsPlaying(false);
    setIsSpinning(true);
  };

  const handleStopBtn = () => {
    setIsRecording(false);
    setIsPlaying(false);
    setIsSpinning(false);
  };

  const handlePlayBtn = () => {
    setIsPlaying(true);
    setIsRecording(false);
    setIsSpinning(true);
  };

  const recordLight = () => {
    return isRecording ? "record-light__on" : "record-light__off";
  };

  const playLight = () => {
    return isPlaying ? "play-light__on" : "play-light__off";
  };

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
    <>
    <div className="flex input-ui__container py-[3%] px-[10%] justify-between">
      <div className="flex flex-col justify-center items-center py-1 ">
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

      <div className="flex flex-col w-fit-content ">
        <div className="light-container flex justify-between px-[15%] pb-2">
          <div className={recordLight()}></div>
          <div className={playLight()}></div>
        </div>
        <div className="flex btn-container">
          <button className="btn" onClick={handleRecordBtn}>
            <span className="record-btn">rec</span>
          </button>
          <button className="btn" onClick={handleStopBtn}>
            <span className="stop-btn">stop</span>
          </button>
          <button className="btn" onClick={handlePlayBtn}>
            <span className="play-btn">play</span>
          </button>
        </div>
      </div>
    </div>
    <div className="bottom-panel flex justify-center items-center  py-[3%] px-[10%]">
    <div className="vu-meter">
        <div className="vu-meter__background"></div>
        <div className="vu-meter__needle-container">
          <div className={`vu-meter__needle ${isSpinning ? 'is-spinning' : ''}`}></div>
        </div>
        <div className="vu-meter__text-container">
          <div className="vu-meter__text">VU</div>
        </div>
        <div className="vu-meter__black-layer"></div>
        <div className="vu-meter__silver-layer"></div>
      </div>
    </div>

    <div className="bottom-trim"></div>
    </>
  );
};

export default controls;
