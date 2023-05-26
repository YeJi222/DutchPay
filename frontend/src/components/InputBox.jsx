import React from 'react';

function inputBox({inputTitle, boxTitleText, placeholder}){
    return(
        <div>
            <p className='inputTitle'>{inputTitle}</p>
            <div className='inputBox'>
                <div className='boxTitle'>
                    <p className='boxTitleText'>{boxTitleText}</p>
                </div>
                <input className='input' placeholder={placeholder}></input>
            </div>
            <div className='errorMessage'>
                Please check the {inputTitle} again.
            </div>
        </div>
    );
}

export default inputBox;