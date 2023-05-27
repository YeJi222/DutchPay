import React from 'react';

function inputBox({inputTitle, boxTitleText, placeholder, isToggled}){
    return(
        <div>
            <p className='inputTitle' style={{ color: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}>{inputTitle}</p>
            <div className='inputBox' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                <div className='boxTitle'>
                    <p className='boxTitleText'>{boxTitleText}</p>
                </div>
                <input className='input' placeholder={placeholder} style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}></input>
            </div>
            <div className='errorMessage'>
                Please check the {inputTitle} again.
            </div>
        </div>
    );
}

export default inputBox;