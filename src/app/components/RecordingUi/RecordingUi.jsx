import React, { useState } from "react";
import "./RecordingUi.css";

export default function RecordingUi() {

    const [isSpinning, setIsSpinning] = useState(false);
    const playerClass = `tape-player has-tape ${isSpinning ? "playing" : ""}`;


  function togglePlaying() {
    setIsSpinning(!isSpinning);
  }

  return (
    <div>
      <div className={playerClass} onClick={togglePlaying}>
        <div className="buttons">
          <div className="left"></div>
          <div className="middle"></div>
          <div className="right"></div>
        </div>
        <div className="small-reel">
          <div className="middle circle"></div>
        </div>
        <div className="small-reel__two">
          <div className="middle circle"></div>
        </div>
        <div className="big-reel">
          <div className="hole one"></div>
          <div className="hole two"></div>
          <div className="hole three"></div>
          <div className="middle-hole"></div>
        </div>
        <div className="big-reel__two">
          <div className="hole__two one"></div>
          <div className="hole__two two"></div>
          <div className="hole__two three"></div>
          <div className="middle-hole"></div>
        </div>

        {/* <div className="tape-top"></div> */}
        <div className="tape-left"></div>
        <div className="tape-right"></div>
        {/* <div className="tape-bottom"></div> */}

      </div>
    </div>
  );
}
