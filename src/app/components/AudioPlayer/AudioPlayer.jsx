'use client';
import { useAudioContext } from "../AudioContextProvider/AudioContextProvider.jsx";


export default function AudioPlayer({ audioBuffer }) {
    //const { audioContext } = useAudioContext();
    const { audioContext, initializeAudioContext } = useAudioContext();

    let source = null;
  
    const playAudio = () => {
      if (audioBuffer && audioContext) {
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
      }
    };
  
    const stopAudio = () => {
      if (source) {
        source.stop();
        source = null;
      }
    };
  
    return (
      <div>
        <button onClick={playAudio} className="text-black bg-green-500 p-2 m-2">Play</button>
        <button onClick={stopAudio} className="text-black bg-red-500 p-2 m-2">Stop</button>
      </div>
    );
  }
  