'use client';
import React from "react";
import  AudioContextProvider  from "./components/AudioContextProvider/AudioContextProvider";
import RecordingBooth from "./components/RecordingBooth/RecordingBooth";
import RecordingUi from "./components/RecordingUi/RecordingUi";
import InputUi from "./components/InputUi/InputUi";

export default function Home() {

  return (
    <AudioContextProvider>
    <div className="px-5">
      <div className="py-5">
        <div className="flex flex-col justify-center items-center gap-8">
          <RecordingBooth />
          <InputUi />
          <RecordingUi />
        </div>
      </div>
    </div>
    </AudioContextProvider>
  );
}
