'use client';
import React from "react";
import dynamic from 'next/dynamic';
import  AudioContextProvider  from "./components/AudioContextProvider/AudioContextProvider";
// import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

const AudioPlayerNoSSR = dynamic(() => import('./components/AudioPlayer/AudioPlayer'), {
  ssr: false,
});

export default function Home() {

  return (
    <AudioContextProvider>
    <div className="px-5">
      <div className="py-5">
        <div className="flex flex-col justify-center items-center ">
          {/* <AudioPlayer /> */}
          <AudioPlayerNoSSR />
        </div>
      </div>
    </div>
    </AudioContextProvider>
  );
}
