// import React, { createContext, useContext, useState } from 'react';

// const AudioContextContext = createContext(null);

// export const useAudioContext = () => useContext(AudioContextContext);

// export default function AudioContextProvider({ children }) {
//   const [audioContext, setAudioContext] = useState(null);

//   const initializeAudioContext = () => {
//     if (!audioContext) {
//       const context = new (window.AudioContext || window.webkitAudioContext)();
//       setAudioContext(context);
//     }
//   };

//   return (
//     <AudioContextContext.Provider value={{ audioContext, initializeAudioContext }}>
//       {children}
//     </AudioContextContext.Provider>
//   );
// }
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContextContext = createContext(null);

export const useAudioContext = () => useContext(AudioContextContext);

export default function AudioContextProvider({ children }) {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // This effect listens for the 'click' event to initialize the audio context
    const initializeOnUserGesture = () => {
      if (!audioContext) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        // Optionally, remove event listener once the audio context is initialized
        document.removeEventListener('click', initializeOnUserGesture);
      }
    };

    // Add event listener to the whole document to capture the first user interaction
    document.addEventListener('click', initializeOnUserGesture);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('click', initializeOnUserGesture);
    };
  }, [audioContext]); // Ensure this effect runs once and only reruns if audioContext changes

  return (
    <AudioContextContext.Provider value={{ audioContext, initializeAudioContext: () => {} }}>
      {children}
    </AudioContextContext.Provider>
  );
}
