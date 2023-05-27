import React from 'react';

function inputBox({inputTitle, boxTitleText, placeholder, isToggled, inputValue, setFunc}){
    return(
        <div>
            <p className='inputTitle' style={{ color: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}>{inputTitle}</p>
            <div className='inputBox' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                <div className='boxTitle'>
                    <p className='boxTitleText'>{boxTitleText}</p>
                </div>
                <input className='input' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setFunc(e.target.value)}
                >
                </input>
            </div>
            <div className='errorMessage'>
                Please check the {inputTitle} again.
            </div>
        </div>
    );
}

export default inputBox;