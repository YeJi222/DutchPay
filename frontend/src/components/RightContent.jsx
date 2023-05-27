import React from 'react';
import InputBox from './InputBox';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RightContent({mainTitle, isToggled, id, pw, bank, account, setId, setPw, setBank, setAccount}){
    const loginAction = e => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pw', pw);
    
        axios({
            method: "post",
            url: 'http://localhost:8090/login',
            data: formData
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className='rightPart'>
            <div className='mainTitle' style={{ color: isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                {mainTitle}
            </div>
            <div className='inputBoxArea' style={{ marginTop: isToggled !== "login" ? "-80px" : "0"}}>
                <InputBox
                    inputTitle="ID"
                    boxTitleText="ID"
                    placeholder="Enter your ID"
                    isToggled={isToggled}
                    inputValue={id}
                    boxName="id"
                    setFunc={setId}
                />
                <InputBox
                    inputTitle="Password"
                    boxTitleText="PW"
                    placeholder="*******"
                    isToggled={isToggled}
                    inputValue={pw}
                    boxName="pw"
                    setFunc={setPw}
                />
            </div>
            {isToggled === "login" ? (
                <div></div>
            ) : 
            (
                <div className='inputBoxArea'>
                    <InputBox
                        inputTitle="Bank"
                        placeholder="Enter your bank name"
                        isToggled={isToggled}
                        inputValue={bank}
                        boxName="bank"
                        setFunc={setBank}
                    />
                    <InputBox
                        inputTitle="Account"
                        placeholder="Enter your account"
                        isToggled={isToggled}
                        inputValue={account}
                        boxName="account"
                        setFunc={setAccount}
                    />
                    <div style={{marginBottom : "-30px"}}></div>
                </div>
            )}
            <div className='button' onClick={loginAction}>
                {mainTitle} {'>'}
            </div>
        </div> 
    );
}

export default RightContent;