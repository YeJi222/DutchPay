import React, { useState, useEffect } from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import Toggle from './Toggle';

function Login(){
    const [isToggled, setIsToggled] = useState("login");

    const handleToggle = () => {
        setIsToggled(isToggled === "login" ? "sign up" : "login");
        console.log(isToggled);
    };

    return(
        <div className='page'>
            <header style={{ fill: isToggled === "login" ? "#FFF6F6" : "#E3EAFF" }}>
                {isToggled === "login" ? (
                    <img src="/images/logo.png" className='logoImg'/>
                ) : (
                    <img src="/images/logo2.png" className='logoImg'/>
                )}
                <span className='title'>Dutch Pay</span>
            </header>
            <Toggle
                isToggled={isToggled}
                handleToggle={handleToggle}
            />

            <div className='centerWrapper'>
                {/* left content */}
                {isToggled === "login" ? (
                    <LeftContent
                        topText="Welcome :)"
                        bottomText="This Web is Dutch Pay Service.
                        Please log in before using this service."
                        isToggled={isToggled}
                    />
                ) : (
                    <LeftContent
                        topText="Welcome :)"
                        bottomText="This Web is Dutch Pay Service.
                        Please sign up before login this service."
                        isToggled={isToggled}
                    />
                )}

                {/* right content */}
                {isToggled === "login" ? (
                    <RightContent
                    mainTitle="Log In"
                    isToggled={isToggled}
                /> 
                ) : (
                    <RightContent
                    mainTitle="sign up"
                    isToggled={isToggled}
                /> 
                )}
            </div>
        </div>
    )
}

export default Login;