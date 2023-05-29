import React, { useState, useEffect } from 'react';
import RightContent from './RightContent';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import MainLeftContent from './MainLeftContent';
import Toggle from './Toggle';

function Main(){
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("state: ", location.state);

    const [isMainToggled, setIsMainToggled] = useState("receive");
    const [userInfo, setUserInfo] = useState(location.state);

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);
    const sessionUserId = sessionData.userId;

    // console.log("storedData : ", sessionData);
    // console.log("userId : ", sessionData.userId);
    // console.log("userPw : ", sessionData.userPw);

    useEffect(() => {
        const formData = new FormData();
        formData.append('sessionUserId', sessionUserId);

        axios({
            method: "post",
            url: 'http://localhost:8090/getUserInfo',
            data: formData
        })
        .then(function(response){
            setUserInfo(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }, []);

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
                        userId={userInfo.userId}
                        userPw={userInfo.userPw}
                        phone={userInfo.phone}
                        bank={userInfo.bank}
                        account={userInfo.account}
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