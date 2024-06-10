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
        alert(
          "Permission to access microphone was denied in browser settings. Please reset and allow access to microphone to record audio."
        );
      });
  }

  function handleSelectAudioDevice(id) {
    setSelectedDevice(id);
    console.log("device is:", id);
  }

  // function stopRecording() {
  //   if (
  //     mediaRecorderRef.current &&
  //     mediaRecorderRef.current.state !== "inactive"
  //   ) {
  //     mediaRecorderRef.current.stop();
  //     mediaRecorderRef.current.onstop = async () => {
  //       const audioBlob = new Blob(recordedChunks.current, {
  //         type: "audio/webm",
  //       });
  //       const arrayBuffer = await audioBlob.arrayBuffer();

  //       // Check if audioContext is initialized
  //       if (!audioContext) {
  //         console.error("AudioContext not initialized");
  //         return; // Or initialize it here if appropriate
  //       }

  //       try {
  //         const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  //         setSavedAudioData((prev) => [...prev, audioBuffer]);
  //       } catch (error) {
  //         console.error("Error decoding audio data", error);
  //       }

  //       recordedChunks.current = [];
  //       if (streamRef.current) {
  //         streamRef.current.getTracks().forEach((track) => track.stop());
  //       }
  //     };
  //   } else {
  //     console.log("MediaRecorder is not initialized or already stopped");
  //   }
  //   setIsRecording(false);
  // }

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

          // Create an OfflineAudioContext to process the audio
          const offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
          );

          // Create a buffer source
          const source = offlineContext.createBufferSource();
          source.buffer = audioBuffer;

          // Create a gain node
          const gainNode = offlineContext.createGain();

          // Define the fade durations to eliminate noise at the start and end
          const fadeInDuration = 0.5; // 0.5 seconds fade-in at start
          const totalDuration = audioBuffer.duration;
          const endFadeStart = totalDuration - 0.75; // Start fade 0.75 seconds before end
          const endFadeEnd = totalDuration - 0.25; // End fade 0.25 seconds before end

          // Create the gain envelope
          gainNode.gain.setValueAtTime(0, 0); // Start at volume 0
          gainNode.gain.linearRampToValueAtTime(1, fadeInDuration); // Fade in to volume 1
          gainNode.gain.setValueAtTime(1, endFadeStart); // Maintain volume 1
          gainNode.gain.linearRampToValueAtTime(0, endFadeEnd); // Fade out to volume 0
          gainNode.gain.setValueAtTime(0, totalDuration); // Maintain volume 0

          // // Create the envelope
          // const fadeDuration = 0.5;
          // const totalDuration = audioBuffer.duration;

          // gainNode.gain.setValueAtTime(0, 0);
          // gainNode.gain.linearRampToValueAtTime(1, fadeDuration);
          // gainNode.gain.setValueAtTime(1, totalDuration - fadeDuration);
          // gainNode.gain.linearRampToValueAtTime(0, totalDuration);

          // Connect the nodes
          source.connect(gainNode);
          gainNode.connect(offlineContext.destination);

          // Start the source
          source.start(0);

          // Render the audio
          const processedBuffer = await offlineContext.startRendering();

          // Update the saved audio data
          setSavedAudioData((prev) => [...prev, processedBuffer]);
        } catch (error) {
          console.error("Error decoding or processing audio data", error);
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
        <div className="py-5"></div>
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
