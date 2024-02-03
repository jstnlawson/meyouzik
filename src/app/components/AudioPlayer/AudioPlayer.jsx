'use client';
import React, { useEffect, useState, useRef } from "react";
import { useAudioContext } from "../AudioContextProvider/AudioContextProvider.jsx";
import RecordingBooth from "../RecordingBooth/RecordingBooth.jsx";


export default function AudioPlayer({ audioBuffer }) {
    //const { audioContext } = useAudioContext();
    const { audioContext, initializeAudioContext } = useAudioContext();
    const [savedAudioData, setSavedAudioData] = useState([]);


    let source = null;
  
    const playAudio = (index) => {
      const selectedBuffer = savedAudioData[index];
      if (selectedBuffer && audioContext) {
        source = audioContext.createBufferSource();
        source.buffer = selectedBuffer;
        source.connect(audioContext.destination);
        source.start();
      }
    };
  
    const stopAudio = (index) => {
      if (source) {
        source.stop();
        source = null;
      }
    };
  
    return (
      <div>
        <RecordingBooth
        playAudio={playAudio}
        stopAudio={stopAudio}
        savedAudioData={savedAudioData}
        setSavedAudioData={setSavedAudioData}
        />
      </div>
    );
  }
  