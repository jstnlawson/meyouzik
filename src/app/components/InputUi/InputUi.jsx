import React, { useState, useEffect } from 'react';
import './InputUi.css';

const InputUi = () => {
    const [position, setPosition] = useState('middle');

    const autoPositionSlider = () => {
        const slider = document.querySelector('input[type="range"]');
        const value = slider.value;
        let newPosition;

        if (value <= 33) {
            newPosition = 'left';
            slider.value = 5;
        } else if (value >= 67) {
            newPosition = 'right';
            slider.value = 95;
        } else {
            newPosition = 'middle';
            slider.value = 50;
        }

        setPosition(newPosition);
    };

    useEffect(() => {
        autoPositionSlider();
    }, []);

    return (
        <div className='bg-[#abd1b5] flex flex-col justify-center items-center'>
            <div>

            </div>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={autoPositionSlider} // Use onChange instead of onClick
                className="slider"
            />
            <p>Position: {position}</p>
        </div>
    );
    };

    export default InputUi;
