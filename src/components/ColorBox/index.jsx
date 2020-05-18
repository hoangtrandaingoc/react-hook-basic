import React, { useState } from 'react';
import './ColorBox.scss';
function getRandomColor(){
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random()*5)
    //math.trunc lay phan nguyen => random tu 0-4
    return COLOR_LIST[randomIndex];
} 
function ColorBox() {
    
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box-color') || 'deeppink';
        console.log(initColor);
        return initColor;
        // initColor chi render 1 lan, k goi lai code
    });

    function handleBoxClick(){
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box-color', newColor);
    }

    return (
        <div 
            className="color-box"
            style={{backgroundColor: color}}
            onClick={handleBoxClick}
            >
                Color Box
        </div>
    );
}

export default ColorBox;


