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
        <div className='flex input-ui__container'>
        <div className='bg-[#abd1b5] flex flex-col justify-center items-center px-4 py-1 w-[230px] h-[110px]'>
            <div className='flex input-label__container'>
                <div className='input-label__one'>Mic 1</div>
                <div className='input-label__two'>Mic 2</div>
                <div className='input-label__three'>Mic 3</div>
            </div>
            <div className='mb-1 flex justify-bottom bracket-div__container'>
                <div className='bracket-div__one'></div>
                <div className='bracket-div__two'></div>
                <div className='bracket-div__three'></div>
                <div className='bracket-div__four'></div>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={autoPositionSlider} // Use onChange instead of onClick
                className="slider"
            />
            {/* <p>Position: {position}</p> */}
        </div>
        <div className='flex justify-center items-center w-[230px] h-[110px] bg-[#abd1b5] gap-3'>
            <button className='text-black px-4 py-1 bg-orange-100'>▶</button>
            <button className='text-black px-4 py-1 bg-orange-100'>⬛️</button>
        </div>
        </div>
    );
    };

    export default InputUi;
