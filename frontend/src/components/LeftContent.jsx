import React from 'react';

function LeftContent({topText, bottomText, isToggled}){
    return(
        <div className='leftPart' style={{ backgroundColor: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}>
            <div className='leftTopText'>
                <h1>{topText}</h1>
            </div>
            <div className='pigImgArea'>
                    <img src="/images/pig.png" className='pigImg'></img>
            </div>
            <div className='leftBottomText'>
                <h1>{bottomText}</h1>
            </div>
        </div>    
    );
}

export default LeftContent;