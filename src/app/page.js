'use client';
import React from "react";
import  AudioContextProvider  from "./components/AudioContextProvider/AudioContextProvider";
import RecordingBooth from "./components/RecordingBooth/RecordingBooth";

export default function Home() {

  return (
    <AudioContextProvider>
    <div className="px-5">
      <div className="py-5">
        <div className="flex flex-col justify-center items-center gap-8">
          <RecordingBooth />
        </div>
      </div>
    </div>
    </AudioContextProvider>
  );
}
