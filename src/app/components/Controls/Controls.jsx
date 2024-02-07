import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Controls.css";

const Controls = ({
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
  deleteAudio,
  isAudioPlaying,
  setIsAudioPlaying,
}) => {
  const [position, setPosition] = useState("middle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [isMicLightOn, setIsMicLightOn] = useState(false);
  const [isLineLightOn, setIsLineLightOn] = useState(false);
  const audioRef = useRef(new Audio());
  const maxRecordings = 6;

  const handleMicBtn = () => {
    allowMicrophone();
    setIsMicLightOn(true);
  };

  const handleLineSlider = () => {
    if (isMicLightOn === true) {
    setIsLineLightOn(true);
    } else {
      alert("Please allow microphone access by clicking the 'MIC' button before selecting an input.");
    }
    autoPositionSlider();
  };

  const handleRecordBtn = () => {
    if (isLineLightOn === true) {
    if (recordCount < maxRecordings) {
    setIsRecordPressed(true);
    setIsPlaying(false);
    setIsSpinning(true);
    startRecording();
    setRecordCount(prevCount => prevCount + 1); 
    } else {
      alert("Recording limit reached. You cannot make more recordings."); 
    }
  } else {
    alert("Please allow microphone access by pressing the 'MIC' button then select an input with the line slider to record."); 
  }
  };

  // const handleStopBtn = () => {
  //   setIsRecordPressed(false);
  //   setIsPlaying(false);
  //   setIsSpinning(false);
  //   if (isMicrophoneAllowed === "granted" && isRecording) {
  //     stopRecording();
  //   }
  //   stopAudio();
  // };

  const handleStopBtn = useCallback(() => {
    setIsRecordPressed(false);
    setIsPlaying(false);
    setIsSpinning(false);
    if (isMicrophoneAllowed === "granted" && isRecording) {
      stopRecording();
    }
    stopAudio();
  }, [isMicrophoneAllowed, isRecording, stopRecording, stopAudio]); 

  const handlePlayBtn = () => {
    if (recordCount > 0) {
    setIsPlaying(true);
    setIsRecordPressed(false);
    setIsSpinning(true);
    playAudio(currentAudioIndex);
    }
  };

  const handleDeleteBtn = () => {
    deleteAudio(currentAudioIndex);
    setRecordCount((prevCount) => prevCount - 1);
  };

  const micLight = () => {
    return isMicLightOn ? "mic-light__on" : "mic-light__off";
  };

  const lineLight = () => {
    return isLineLightOn ? "line-light__on" : "line-light__off";
  };

  const recordLight = () => {
    return isRecordPressed ? "record-light__on" : "record-light__off";
  };

  const playLight = () => {
    return isPlaying ? "play-light__on" : "play-light__off";
  };

  const autoPositionSlider = useCallback(() => {
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

    if (availableDevices && availableDevices.length > 0) {
      const selectedIndex = Math.floor((value / 100) * availableDevices.length);
      const selectedDevice = availableDevices[selectedIndex];
      if (selectedDevice && selectedDevice.id) {
        handleSelectAudioDevice(selectedDevice.id);
      } else {
        console.error("Selected device is undefined or does not have an id property");
      }
    } else {
      console.error("No available devices found");
    }
  }, [setPosition, availableDevices, handleSelectAudioDevice]);    

  const handlePreviousBtn = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex((prevIndex) => prevIndex - 1);
    }
  };
  
  const handleNextBtn = () => {
    if (currentAudioIndex < savedAudioData.length - 1) {
      setCurrentAudioIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    // Ensure availableDevices is populated and contains objects with id property
    if (availableDevices && availableDevices.length > 0 && availableDevices.every(device => device.id)) {
      autoPositionSlider();
    }
  }, [availableDevices, autoPositionSlider]); // Depend on availableDevices so it re-runs when availableDevices updates
  
  const prevIsAudioPlaying = useRef(false);
  useEffect(() => {
    if (!isAudioPlaying && prevIsAudioPlaying.current) {
      handleStopBtn();
    }
    prevIsAudioPlaying.current = isAudioPlaying;
  }, [isAudioPlaying, handleStopBtn]);

  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
  
    if (container && container.children && container.children.length > 0) {
      const item = container.children[currentAudioIndex];
  
      if (item) {
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [currentAudioIndex]);

  function selectAudioInput(id) {
    setSelectedDevice(id);
  }

  return (
    <>
      <div className="flex middle-panel__container py-[2%] px-[5%] justify-between">
        <div className="middle-panel__left flex justify-between items-center w-[33%]">
          <div className="power-btn__container flex flex-col justify-center items-center">
            <span className="text-[.5rem] md:text-[0.6rem] text-black">PWR</span>
            <button className="vrt-btn">
              <span className="mic-btn"></span>
            </button>
            <div className="power-light__on"></div>
          </div>
          <div className="mic-btn__container flex flex-col justify-center items-center">
            <span className="text-[.5rem] md:text-[0.6rem] text-black">MIC</span>
            <button className="vrt-btn" onClick={handleMicBtn}>
              <span className="mic-btn"></span>
            </button>
            <div className={micLight()}></div>
          </div>
            <div className=" flex flex-col justify-center items-center text-black text-[.5rem] md:text-[0.6rem]">
              <span>LINE</span>
              <div className="input-select__container">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              onChange={handleLineSlider} 
              className="slider"
            />
            </div>
            <div className="input-select__numbers flex justify-between w-[77%] text-[.5rem] md:text-[0.6rem]">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
              <div className={lineLight()}></div>
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
                <span className="record-btn md:text-[0.7rem]">rec</span>
              </button>
              <button className="btn" onClick={handleStopBtn}>
                <span className="stop-btn md:text-[0.7rem]">stop</span>
              </button>
              <button className="btn" onClick={handlePlayBtn}>
                <span className="play-btn md:text-[0.7rem]">play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-panel flex justify-between items-center  py-[1%] px-[5%]">
        <div className="bottom-panel__left flex w-[33%] justify-center items-center flex-col ">
          <div className="input-screen flex justify-center items-center">
            <span className="input-screen__title text-[.3rem] md:text-[.6rem] sm:text-[.4rem]">current input</span>
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
            <span className="mic-inputs__title text-[.2rem] md:text-[.6rem]  sm:text-[.4rem] bg-[#000] md:bg-[transparent]">inputs</span>

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
                | | | | | | | | | | | | | <br />| | | | | | | | | | | | |
                | | | | | | | | <br />| | | | | | | | | | | | |
                | | | | | | | | | | | | | |
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

        <div className="bottom-panel__right flex flex-col w-[33%] justify-center items-center">
          <div>
          <div className="input-screen flex justify-center items-center sm:mb-2 sm:mt-0 mt-1">
            <span className="input-screen__title text-[.3rem] md:text-[.6rem] ">samples</span>
            <div className="input-screen__layer-one"></div>
            <div className="input-screen__layer-two  flex-wrap" ref={containerRef}>
              {isMicrophoneAllowed === "granted" && !savedAudioData.length &&
                !isRecording &&
                selectedDevice && (
                  <>
                    <span className="input-screen__text">
                      Press record to make a sample
                    </span>
                  </>
                )}
              {savedAudioData.map((audioBuffer, index) => (
                <ul key={index} className="flex md:flex-row flex-col">
                  <li
                  className={`p-1  ${
                    currentAudioIndex === index
                      ? "input-screen__text bg-[#0dff0032]"
                      : "input-screen__text" // Default background color for other samples
                  }`}
                >            
                      Sample-{index + 1}
                    
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="select-file__container">
          <button className="previous-button" onClick={handlePreviousBtn}>
            <span className="previous-button-inside">˂</span>
          </button>
          <button className="next-button" onClick={handleNextBtn}>
            <span className="next-button-inside">˃</span>
          </button>
          <button className="next-button" onClick={handleDeleteBtn}>
            <span className="next-button-inside">x</span>
          </button>
          </div>
          </div>
        </div>
      </div>

      <div className="bottom-trim"></div>
    </>
  );
};

export default Controls;
