import React, { useState } from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import Toggle from './Toggle';

function Login(){
    const [isToggled, setIsToggled] = useState("login");

    const handleToggle = () => {
        setIsToggled(isToggled == "login" ? "sign up" : "login");
        console.log(isToggled);
    };

    return(
        <div className='page'>
            <header>
                <img src="/images/logo.png" className='logoImg'/>
                <span className='title'>Dutch Pay</span>
            </header>
            <Toggle
                isToggled={isToggled}
                handleToggle={handleToggle}
            />

            <div className='centerWrapper'>
                <LeftContent
                    topText="Welcome :)"
                    bottomText="This Web is Dutch Pay Service.
                    Please log in before using this service."
                />
                <RightContent
                    mainTitle="Log In"
                />
            </div>
        </div>
    )
}

export default Login;