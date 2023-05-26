import React from 'react';
import InputBox from './InputBox';

function RightContent({mainTitle}){
    return(
        <div className='rightPart'>
            <div className='mainTitle'>
                {mainTitle}
            </div>
            <div className='inputBoxArea'>
                <InputBox
                    inputTitle="Phone Number"
                    boxTitleText="ID"
                    placeholder="010-1234-5678"
                />
                <InputBox
                    inputTitle="Password"
                    boxTitleText="PW"
                    placeholder="*******"
                />
            </div>
            <div className='button'>
                {mainTitle} >
            </div>
        </div> 
    );
}

export default RightContent;