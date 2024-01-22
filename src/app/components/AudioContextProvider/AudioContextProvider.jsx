import React, { createContext, useContext, useEffect, useState } from 'react';

const AudioContextContext = createContext(null);

export const useAudioContext = () => useContext(AudioContextContext);

export default function AudioContextProvider  ({ children }) {
  const [audioContext, setAudioContext] = useState(null);

  // useEffect(() => {
  //   const context = new AudioContext();
  //   setAudioContext(context);
  //   return () => context.close(); // Clean up on unmount
  // }, []);

   // Function to initialize the AudioContext
   const initAudioContext = () => {
    if (!audioContext) {
      const newAudioContext = new AudioContext();
      setAudioContext(newAudioContext);
    }
  };

  return (
    <AudioContextContext.Provider value={{ audioContext, initAudioContext }}>
      {children}
    </AudioContextContext.Provider>
  );
};
