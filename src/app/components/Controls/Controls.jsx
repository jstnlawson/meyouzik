import React, { useState, useEffect, useRef } from "react";
import "./Controls.css";

const controls = ({
  isSpinning,
  setIsSpinning,
  isRecordPressed,
  setIsRecordPressed,
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
}) => {
  const [position, setPosition] = useState("middle");
  const [isPlaying, setIsPlaying] = useState(false);
  const inputScreenRef = useRef(null);

  const handleRecordBtn = () => {
    setIsRecordPressed(true);
    setIsPlaying(false);
    setIsSpinning(true);
    startRecording();
  };

  const handleStopBtn = () => {
    setIsRecordPressed(false);
    setIsPlaying(false);
    setIsSpinning(false);
    if (isMicrophoneAllowed === "granted" && isRecording) {
      stopRecording();
    }
    stopAudio();
  };

  const handlePlayBtn = () => {
    setIsPlaying(true);
    setIsRecordPressed(false);
    setIsSpinning(true);
    playAudio();
  };

  const recordLight = () => {
    return isRecordPressed ? "record-light__on" : "record-light__off";
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

    const selectedIndex = Math.floor((value / 100) * availableDevices.length);
    // const selectedInput = availableDevices[selectedIndex];

    // Check if selectedDevice is defined and has an 'id' property
    if (availableDevices[selectedIndex] && availableDevices[selectedIndex].id) {
      const selectedDevice = availableDevices[selectedIndex];
      // Call handleSelectAudioDevice with the selected device
      handleSelectAudioDevice(selectedDevice.id);
    } else {
      console.error(
        "Selected device is undefined or does not have an id property"
      );
    }
  };

  useEffect(() => {
    autoPositionSlider();
  }, []);

  function selectAudioInput(id) {
    setSelectedDevice(id);
  }

  return (
    <>
      <div className="flex middle-panel__container py-[2%] px-[5%] justify-between">
        <div className="middle-panel__left flex justify-between items-center w-[33%]">
          <div className="power-btn__container flex flex-col justify-center items-center">
            <span className="text-[.5rem] text-black">PWR</span>
            <button className="vrt-btn">
              <span className="mic-btn"></span>
            </button>
            <div className="power-light__off mt-1"></div>
          </div>
          <div className="mic-btn__container flex flex-col justify-center items-center">
            <span className="text-[.5rem] text-black">MIC</span>
            <button className="vrt-btn" onClick={allowMicrophone}>
              <span className="mic-btn"></span>
            </button>
            <div className="mic-light__off mt-1"></div>
          </div>
          <div className="input-selector__container flex-col">
            <div className="flex input-label__container">
              <div className="input-label__two mr-[2px]">2</div>
            </div>
            <div className="flex justify-bottom items-center bracket-div__container">
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
            <div className="flex justify-center items-center leading-[0]">
              <span className="text-black text-[.55rem] mt-1">LINE</span>
            </div>
          </div>
        </div>

        <div className="middle-panel__middle flex w-[33%]"></div>

        <div className=" flex middle-panel__right w-[33%] justify-center">
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
      </div>
      <div className="bottom-panel flex justify-between items-center  py-[1%] px-[5%]">
        <div className="bottom-panel__left flex w-[33%] justify-center items-center flex-col ">
          <div className="input-screen flex justify-center items-center">
            <span className="input-screen__title">current input</span>
            <div className="input-screen__layer-one"></div>
            <div className="input-screen__layer-two ">
              {isMicrophoneAllowed === "prompt" && (
                <>
                  <span className="input-screen__text">
                    press mic button to allow microphone access...
                  </span>
                </>
              )}
              {isMicrophoneAllowed === "granted" && (
                <>
                  {!selectedDevice ? (
                    <span className="input-screen__text">
                      Use the line slider to select a microphone...
                    </span>
                  ) : (
                    availableDevices.map((audioDevice) => (
                      <div
                        key={audioDevice.id}
                        className={`input-screen__text ${
                          selectedDevice === audioDevice.id ? "" : "hidden"
                        }`}
                      >
                        {audioDevice.label}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mic-inputs__container">
            <span className="mic-inputs__title">mic/line</span>

            <div className="mic-inputs">
              <div className="mic-inputs__layer-one">
                <div className="mic-inputs__layer-two"></div>
              </div>
            </div>
            <div className="mic-inputs">
              <div className="mic-inputs__layer-one">
                <div className="mic-inputs__layer-two"></div>
              </div>
            </div>
            <div className="mic-inputs">
              <div className="mic-inputs__layer-one">
                <div className="mic-inputs__layer-two"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-panel__middle flex w-[33%] justify-center">
          <div className="vu-meter">
            <div className="vu-meter__background"></div>
            <div className="vu-meter__needle-container">
              <div
                className={`vu-meter__needle ${
                  isSpinning ? "is-spinning" : ""
                }`}
              ></div>
            </div>
            <div className="vu-meter__arch-container">
              <div className="vu-meter__arch--color">
                | | | | | | | | | | | | | | | | <br />| | | | | | | | | | | | |
                | | | | | | | |
              </div>
              <div className="vu_meter__arch--overlap"></div>
            </div>
            <div className="vu-meter__text-container">
              <div className="vu-meter__text">VU</div>
            </div>
            <div className="vu-meter__black-layer"></div>
            <div className="vu-meter__silver-layer"></div>
          </div>
        </div>

        <div className="bottom-panel__right flex w-[33%] justify-center">
          <div className="input-screen flex justify-center items-center">
            <span className="input-screen__title">sample</span>
            <div className="input-screen__layer-one"></div>
            <div className="input-screen__layer-two ">
              {isMicrophoneAllowed === "granted" &&
                !isRecording &&
                selectedDevice && (
                  <>
                    <span className="input-screen__text">
                      Press record to make a sample
                    </span>
                  </>
                )}
              {savedAudioData.map((audioBuffer, index) => (
                <ul key={index}>
                  <li className="p-1 flex justify-center items-center bg-white rounded">
                    <p className="mr-2 text-black text-[.5rem]">
                      Sample {index + 1}
                    </p>
                    <button
                      onClick={() => playAudio(index)}
                      className="text-black text-[.4rem] bg-green-500 p-1"
                    >
                      Play
                    </button>
                    <button
                      onClick={ () => stopAudio(index)}
                      className="text-black text-[.4rem] bg-red-500 p-1"
                    >
                      Stop
                    </button>
                    <button
                      className="bg-white text-black text-[.75rem] p-1 ml-2"
                      onClick={() => deleteAudio(index)}
                    >
                      🅇
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-trim"></div>
    </>
  );
};

export default controls;
