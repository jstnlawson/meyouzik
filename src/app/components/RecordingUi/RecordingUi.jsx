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
        <div class="buttons">
          <div class="left"></div>
          <div class="middle"></div>
          <div class="right"></div>
        </div>
        <div class="small-reel">
          <div class="middle circle"></div>
          <div class="circle one"></div>
          <div class="circle two"></div>
          <div class="circle three"></div>
          <div class="circle four"></div>
          <div class="circle five"></div>
          <div class="circle six"></div>
          <div class="circle seven"></div>
          <div class="circle eight"></div>
          <div class="circle nine"></div>
        </div>
        <div class="big-reel">
          <div class="hole one"></div>
          <div class="hole two"></div>
          <div class="hole three"></div>
          <div class="middle-hole"></div>
        </div>

        <div class="tape-top"></div>
        <div class="tape-bottom"></div>
      </div>
    </div>
  );
}
