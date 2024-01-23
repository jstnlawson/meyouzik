import React, { createContext, useContext, useState } from 'react';

const AudioContextContext = createContext(null);

export const useAudioContext = () => useContext(AudioContextContext);

export default function AudioContextProvider({ children }) {
  const [audioContext, setAudioContext] = useState(null);

  const initializeAudioContext = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }
  };

  return (
    <AudioContextContext.Provider value={{ audioContext, initializeAudioContext }}>
      {children}
    </AudioContextContext.Provider>
  );
}
