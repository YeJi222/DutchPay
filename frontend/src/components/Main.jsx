import React, { useState, useEffect } from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import Toggle from './Toggle';

function Main(){
    const [isMainToggled, setIsMainToggled] = useState("receive");

    const handleToggle = () => {
        setIsMainToggled(isMainToggled === "receive" ? "send" : "receive");
    };

    return(
        <div className='page' style={{ backgroundImage: isMainToggled === "receive" ? "url('/assets/svg/wave.svg')" : "url('/assets/svg/wave2.svg')" }}>
            <header>
                {isMainToggled === "receive" ? (
                    <img src="/images/logo.png" className='logoImg'/>
                ) : (
                    <img src="/images/logo2.png" className='logoImg'/>
                )}
                <span className='title'>Dutch Pay</span>
            </header>
            <Toggle
                toggleName="mainToggle"
                isToggled={isMainToggled}
                handleToggle={handleToggle}
            />

            <div className='centerWrapper'>
                {/* left content */}
                {isMainToggled === "receive" ? (
                    <LeftContent
                        topText="Welcome :)"
                        bottomText="This Web is Dutch Pay Service.
                        Please log in before using this service."
                        isToggled={isMainToggled}
                    />
                ) : (
                    <LeftContent
                        topText="Welcome :)"
                        bottomText="This Web is Dutch Pay Service.
                        Please sign up before login this service."
                        isToggled={isMainToggled}
                    />
                )}

                {/* right content */}
                {/* {isMainToggled === "receive" ? (
                    <RightContent
                        mainTitle="Log In"
                        isToggled={isMainToggled}
                    /> 
                ) : (
                    <RightContent
                        mainTitle="sign up"
                        isToggled={isMainToggled}
                        setIsToggled={setIsMainToggled}
                    /> 
                )} */}
            </div>
        </div>
    )
}

export default Main;