"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAudioContext } from "../AudioContextProvider/AudioContextProvider.jsx";
import "./RecordingBooth.css";
import RecordingUi from "../RecordingUi/RecordingUi.jsx";

export default function RecordingBooth({ 
  playAudio, 
  stopAudio,  
  savedAudioData, 
  setSavedAudioData,
  isAudioPlaying,
  setIsAudioPlaying,
}) {
  //const { audioContext } = useAudioContext();
  const { audioContext, initializeAudioContext } = useAudioContext();
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState("prompt");
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.7); // Initial zoom level
  const zoomRef = useRef(null);

  let recordedChunks = useRef([]);
  let mediaRecorderRef = useRef(null);
  let streamRef = useRef(null);

  function getAvailableAudioDevices() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioDevices = devices
        .filter((d) => d.kind === "audioinput" && d.deviceId !== "default")
        .map((d) => ({
          id: d.deviceId,
          label: d.label,
        }));
      setAvailableDevices(audioDevices);
    });
  }

  useEffect(() => {
    navigator.permissions.query({ name: "microphone" }).then(function (result) {
      console.log("microphone permission:", result.state);
      result.onchange = function () {
        console.log("changed to:", result.state);
      };
      if (result.state === "denied") {
        alert("Please allow microphone access to record audio");
      }
    });
  }, []);

  function allowMicrophone() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted");
        setIsMicrophoneAllowed("granted");
        getAvailableAudioDevices();
        // The state will be updated by the onchange event listener
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream here
      })
      .catch((err) => {
        console.error("Error requesting microphone access:", err);
        // You might also want to handle errors here, e.g., user declined the request
      });
  }

  function handleSelectAudioDevice(id) {
    setSelectedDevice(id);
    console.log('device is:',id);
  }

  function stopRecording() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(recordedChunks.current, {
          type: "audio/webm",
        });
        const arrayBuffer = await audioBlob.arrayBuffer();

        // Check if audioContext is initialized
        if (!audioContext) {
          console.error("AudioContext not initialized");
          return; // Or initialize it here if appropriate
        }

        try {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          setSavedAudioData((prev) => [...prev, audioBuffer]);
        } catch (error) {
          console.error("Error decoding audio data", error);
        }

        recordedChunks.current = [];
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
    } else {
      console.log("MediaRecorder is not initialized or already stopped");
    }
    setIsRecording(false);
  }

  function startRecording() {
    // Ensure AudioContext is initialized
    if (!audioContext) {
      initializeAudioContext(); // This should be a method to initialize your audioContext
    }
    setIsRecording(true);
    console.log("Recording started");
    const audioConfig =
      selectedDevice && selectedDevice.length > 0
        ? { deviceId: { exact: selectedDevice } }
        : true;

    navigator.mediaDevices
      .getUserMedia({ audio: audioConfig, video: false })
      .then((obtainedStream) => {
        streamRef.current = obtainedStream;
        const options = { mimeType: "audio/webm" };

        mediaRecorderRef.current = new MediaRecorder(
          streamRef.current,
          options
        );

        recordedChunks.current = [];

        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          function (e) {
            if (e.data.size > 0) {
              recordedChunks.current.push(e.data);
            }
          }
        );

        mediaRecorderRef.current.start();
      })
      .catch((err) => {
        console.error("Error requesting microphone access:", err);
        setIsRecording(false);
      });
  }

  function deleteAudio(index) {
    setSavedAudioData((prevAudioData) =>
      prevAudioData.filter((_, i) => i !== index)
    );
  }

  useEffect(() => {
    // Existing code...
  
    // Ensure AudioContext is initialized
    if (!audioContext) {
      initializeAudioContext(); // This should be a method to initialize your audioContext
    }
  
    // Existing code...
  }, [audioContext, initializeAudioContext, savedAudioData]);
  

  return (
    <div
      ref={zoomRef}
      style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.3s" }}
    >
    <div className="px-5">
      <div className="py-5">
        {/* <div className="flex flex-col justify-center items-center gap-8">
          {isMicrophoneAllowed === "granted" && (
            <>
              <p>Please select a microphone input</p>

              {availableDevices.map((audioDevice) => (
                <div
                  key={audioDevice.id}
                  onClick={() => handleSelectAudioDevice(audioDevice.id)}
                  className={`m-2 cursor-pointer text-black p-4 flex justify-center items-center bg-white rounded ${
                    selectedDevice === audioDevice.id
                      ? "bg-blue-500 text-green-500"
                      : "bg-gray-200"
                  }`}
                >
                  <span className="cursor-pointer">{audioDevice.label}</span>
                </div>
              ))}
            </>
          )}
          {isMicrophoneAllowed === "prompt" && (
            <>
              <p>To create samples please allow microphone access</p>
              <button
                className=" text-white p-1 hover:opacity-50"
                onClick={allowMicrophone}
              >
                <span className="text-5xl">🎙️</span> Allow microphone
              </button>
            </>
          )}
          {isMicrophoneAllowed === "denied" && (
            <>
              <p>Microphone has been denied</p>
              <button
                className="bg-white text-black p-1"
                onClick={allowMicrophone}
              >
                Allow microphone
              </button>
            </>
          )}
          {isMicrophoneAllowed === "granted" &&
            !isRecording &&
            selectedDevice && (
              <>
                <button
                  className="bg-white text-black p-1"
                  onClick={startRecording}
                >
                  Start recording
                </button>
              </>
            )}
          {isMicrophoneAllowed === "granted" && isRecording && (
            <>
              <button
                className="bg-white text-black p-1"
                onClick={stopRecording}
              >
                Stop recording
              </button>
            </>
          )}
          {savedAudioData.map((audioBuffer, index) => (
            <ul key={index}>
              <li className="p-4 flex justify-center items-center bg-white rounded">
                <p className="mr-4 text-black">Sample {index + 1}</p>
                <button
                  onClick={ () => playAudio(index) }
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
                  className="bg-white text-black p-1 ml-4"
                  onClick={() => deleteAudio(index)}
                >
                  🅇
                </button>
              </li>
            </ul>
          ))}
        </div> */}
      </div>
      <RecordingUi
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
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
      />
    </div>
    </div>
  );
}
