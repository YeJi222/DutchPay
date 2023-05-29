import React, { useState, useEffect } from 'react';
import RightContent from './RightContent';
import { useNavigate, useLocation  } from "react-router-dom";
import MainLeftContent from './MainLeftContent';
import Toggle from './Toggle';

function Main(){
    const navigate = useNavigate();
    const location = useLocation();

    const [isMainToggled, setIsMainToggled] = useState("receive");
    const userId = location.state.userId;
    const userPw = location.state.userPw;
    const phone = location.state.phone;
    const bank = location.state.bank;
    const account = location.state.account;

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

            <div className='mainCenterWrapper'>
                {/* left content */}
                {isMainToggled === "receive" ? (
                    <MainLeftContent
                        isToggled={isMainToggled}
                        userId={userId}
                        userPw={userPw}
                        phone={phone}
                        bank={bank}
                        account={account}
                    />
                ) : (
                    <MainLeftContent
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