import React, { useState } from "react";
import "./RecordingUi.css";

export default function RecordingUi() {
  const [isSpinning, setIsSpinning] = useState(false);
  const playerClass = `tape-player has-tape ${isSpinning ? "playing" : ""}`;

  function togglePlaying() {
    setIsSpinning(!isSpinning);
  }

  return (
    <div className={playerClass} onClick={togglePlaying}>
      {/* <div className="buttons">
          <div className="left"></div>
          <div className="middle"></div>
          <div className="right"></div>
        </div> */}
      <div className="small-reel">
        <div className="middle circle"></div>
      </div>
      <div className="small-reel__two">
        <div className="middle circle"></div>
      </div>
      
      <div className="big-reel__back-plate--left"> </div>
        <div className="tape-left"></div>
      <div className="big-reel__container--left">
        
      
        <div className="tape-role__left"></div>
        <div className="big-reel"></div>
        <div className="hole one"></div>
        <div className="hole two"></div>
        <div className="hole three"></div>
        <div className="middle-hole"></div>
        
      </div>

      <div className="mounting-pin__container-left">
        <div className="mounting-pin__left"></div>
      </div>

      <div className="big-reel__two">
        <div className="hole__two one"></div>
        <div className="hole__two two"></div>
        <div className="hole__two three"></div>
        <div className="middle-hole"></div>
      </div>

      <div className="tape-reader__layer-one">
        <div className="tape-reader__layer-two">
          <div className="tape-reader__layer-three">
            <div className="tape-reader__label">
              <span className="tape-reader__label__l-span">meyouzik</span>{" "}
              <span className="tape-reader__label__r-span">a-2023</span>
            </div>
            <div className="tape-reader__display text-xs my-1 uppercase">
              recording
            </div>
          </div>
        </div>
      </div>

      
      <div className="tape-left__bottom"></div>
      <div className="tape-right"></div>
      <div className="tape-right__bottom"></div>
    </div>
  );
}
