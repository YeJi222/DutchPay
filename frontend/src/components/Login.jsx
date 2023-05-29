import React, { useState, useEffect } from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import Toggle from './Toggle';

function Login(){
    const [isToggled, setIsToggled] = useState("login");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [phone, setPhone] = useState("");
    const [bank, setBank] = useState("");
    const [account, setAccount] = useState("");
    const [confirmId, setConfirmId] = useState("yes");
    const [confirmPw, setConfirmPw] = useState("yes");
    const [confirmSignUpId, setConfirmSignUpId] = useState("yes");
    const [confirmSignUpPw, setConfirmSignUpPw] = useState("yes");
    const [confirmSignUpPhone, setConfirmSignUpPhone] = useState("yes");
    const [confirmSignUpBank, setConfirmSignUpBank] = useState("yes");
    const [confirmSignUpAccount, setConfirmSignUpAccount] = useState("yes");

    const handleToggle = () => {
        setIsToggled(isToggled === "login" ? "sign up" : "login");
        // console.log(isToggled);
    };

    return(
        <div className='page' style={{ backgroundImage: isToggled === "login" ? "url('/assets/svg/wave.svg')" : "url('/assets/svg/wave2.svg')" }}>
            <header>
                {isToggled === "login" ? (
                    <img src="/images/logo.png" className='logoImg'/>
                ) : (
                    <img src="/images/logo2.png" className='logoImg'/>
                )}
                <span className='title'>Dutch Pay</span>
            </header>
            <Toggle
                toggleName="loginToggle"
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
                        id={id}
                        pw={pw}
                        setId={setId}
                        setPw={setPw}
                        confirmId={confirmId}
                        confirmPw={confirmPw}
                        setConfirmId={setConfirmId}
                        setConfirmPw={setConfirmPw}
                    /> 
                ) : (
                    <RightContent
                        mainTitle="sign up"
                        isToggled={isToggled}
                        setIsToggled={setIsToggled}
                        id={id}
                        pw={pw}
                        phone={phone}
                        bank={bank}
                        account={account}
                        setId={setId}
                        setPw={setPw}
                        setPhone={setPhone}
                        setBank={setBank}
                        setAccount={setAccount}
                        confirmSignUpId={confirmSignUpId}
                        confirmSignUpPw={confirmSignUpPw}
                        confirmSignUpPhone={confirmSignUpPhone}
                        confirmSignUpBank={confirmSignUpBank}
                        confirmSignUpAccount={confirmSignUpAccount}
                        setConfirmSignUpId={setConfirmSignUpId}
                        setConfirmSignUpPw={setConfirmSignUpPw}
                        setConfirmSignUpPhone={setConfirmSignUpPhone}
                        setConfirmSignUpBank={setConfirmSignUpBank}
                        setConfirmSignUpAccount={setConfirmSignUpAccount}
                    /> 
                )}
            </div>
        </div>
    )
}

export default Login;