'use client';
import React from "react";
import  AudioContextProvider  from "./components/AudioContextProvider/AudioContextProvider";
import RecordingBooth from "./components/RecordingBooth/RecordingBooth";
import RecordingUi from "./components/RecordingUi/RecordingUi";
import InputUi from "./components/Controls/Controls";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

export default function Home() {

  return (
    <AudioContextProvider>
    <div className="px-5">
      <div className="py-5">
        <div className="flex flex-col justify-center items-center ">
          <AudioPlayer />
        </div>
      </div>
    </div>
    </AudioContextProvider>
  );
}
