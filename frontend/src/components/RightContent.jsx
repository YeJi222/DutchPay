import React from 'react';
import InputBox from './InputBox';

function RightContent({mainTitle, isToggled}){
    return(
        <div className='rightPart'>
            <div className='mainTitle' style={{ color: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                {mainTitle}
            </div>
            <div className='inputBoxArea'>
                <InputBox
                    inputTitle="Phone Number"
                    boxTitleText="ID"
                    placeholder="010-1234-5678"
                    isToggled={isToggled}
                />
                <InputBox
                    inputTitle="Password"
                    boxTitleText="PW"
                    placeholder="*******"
                    isToggled={isToggled}
                />
            </div>
            <div className='button'>
                {mainTitle} >
            </div>
        </div> 
    );
}

export default RightContent;