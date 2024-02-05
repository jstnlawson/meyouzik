'use client';
import React, { useEffect, useState, useRef } from "react";
import { useAudioContext } from "../AudioContextProvider/AudioContextProvider.jsx";
import RecordingBooth from "../RecordingBooth/RecordingBooth.jsx";


export default function AudioPlayer({ audioBuffer }) {
    
    const { audioContext, initializeAudioContext } = useAudioContext();
    const [savedAudioData, setSavedAudioData] = useState([]);


    let source = null;
    let audioRef = useRef(null);  

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const playAudio = (index) => {
      console.log("Playing audio at index:", index);
      const selectedBuffer = savedAudioData[index];
      if (selectedBuffer && audioContext) {
        source = audioContext.createBufferSource();
        source.buffer = selectedBuffer;
        source.connect(audioContext.destination);
        source.onended = () => {
          console.log("Audio playback ended");
          console.log("isAudioPlaying", isAudioPlaying);
          setIsAudioPlaying(false);
          // You can add any additional logic here
        };
  
        setIsAudioPlaying(true);
  
        const logWhilePlaying = () => {
          if (isAudioPlaying) {
            console.log("Audio is playing...");
            requestAnimationFrame(logWhilePlaying);
          }
        };
  
        source.start();
        logWhilePlaying();
  
        audioRef.current = source;
      }
    };
  
    const stopAudio = () => {
      console.log("Stopping audio");
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current = null;
      }
    };
  
    return (
      <div>
        <RecordingBooth
        playAudio={playAudio}
        stopAudio={stopAudio}
        savedAudioData={savedAudioData}
        setSavedAudioData={setSavedAudioData}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
        />
      </div>
    );
  }
  