import React, { useState } from "react";
import "./RecordingUi.css";
import Controls from "../Controls/Controls.jsx";
import { Input } from "postcss";

export default function RecordingUi({ 
  allowMicrophone,
  isMicrophoneAllowed,
  setIsMicrophoneAllowed,
  availableDevices,
  setAvailableDevices,
  selectedDevice,
  setSelectedDevice,
  handleSelectAudioDevice,
  isRecording,
  setIsRecording,
  startRecording,
  stopRecording,
  savedAudioData,
  setSavedAudioData,
  playAudio,
  stopAudio,
  deleteAudio,
  isAudioPlaying,
  setIsAudioPlaying
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isRecordPressed, setIsRecordPressed] = useState(false);
  const playerClass = `tape-player has-tape ${isSpinning ? "playing" : ""}`;

  function togglePlaying() {
    setIsSpinning(!isSpinning);
  }

  const tapeReaderLight = () => {
    return isRecordPressed
      ? "tape-reader__display--on"
      : "tape-reader__display--off";
  };

  return (
    <div className="reel-to-reel__container">
      <div className={playerClass}>
        <div className="top"></div>
        <div className="vents"></div>

        <div className="small-reel">
          <div className="middle circle"></div>
        </div>
        <div className="small-reel__two">
          <div className="middle circle"></div>
        </div>

        <div className="big-reel__back-plate--left"></div>
        <div className="tape-left"></div>
        <div className="big-reel__container--left">
          <div className="tape-role__left"></div>
          <div className="big-reel"></div>
          <div className="hole one"></div>
          <div className="hole two"></div>
          <div className="hole three"></div>
          <div className="middle-hole">
            <div className="little-middle--one"></div>
            <div className="little-middle--two"></div>
            <div className="little-middle--three"></div>
          </div>
        </div>
        <div className="mounting-pin__container-left">
          <div className="mounting-pin__left"></div>
        </div>

        <div className="big-reel__back-plate--right"></div>
        <div className="tape-right"></div>
        <div className="big-reel__container--right">
          <div className="tape-role__right"></div>
          <div className="big-reel__two"></div>
          <div className="hole__two one"></div>
          <div className="hole__two two"></div>
          <div className="hole__two three"></div>
          <div className="middle-hole">
            <div className="little-middle--one"></div>
            <div className="little-middle--two"></div>
            <div className="little-middle--three"></div>
          </div>
        </div>
        <div className="mounting-pin__container-right">
          <div className="mounting-pin__right"></div>
        </div>

        <div className="tape-reader__layer-one">
          <div className="tape-reader__layer-two">
            <div className="tape-reader__layer-three">
              <div className="tape-reader__label">
                <span className="tape-reader__label__l-span">meyouzik</span>{" "}
                <span className="tape-reader__label__r-span">a-2024</span>
              </div>
              <div className={tapeReaderLight()}>recording</div>
            </div>
          </div>
        </div>

        <div className="tape-left__bottom"></div>
        <div className="tape-right__bottom"></div>
      </div>
      <div className="button-panel">
        <Controls
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          isRecordPressed={isRecordPressed}
          setIsRecordPressed={setIsRecordPressed}
          allowMicrophone={allowMicrophone}
          isMicrophoneAllowed={isMicrophoneAllowed}
          setIsMicrophoneAllowed={setIsMicrophoneAllowed}
          availableDevices={availableDevices}
          setAvailableDevices={setAvailableDevices}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          handleSelectAudioDevice={handleSelectAudioDevice}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          savedAudioData={savedAudioData}
          setSavedAudioData={setSavedAudioData}
          playAudio={playAudio}
          stopAudio={stopAudio}
          deleteAudio={deleteAudio}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
        />
      </div>
    </div>
  );
}
