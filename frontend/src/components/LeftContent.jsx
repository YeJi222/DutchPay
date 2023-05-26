import React from 'react';

function LeftContent({topText, bottomText}){
    return(
        <div className='leftPart'>
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