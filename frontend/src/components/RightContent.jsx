import React from 'react';
import InputBox from './InputBox';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RightContent({mainTitle, isToggled, id, pw, phone, bank, account, setId, setPw, setPhone, setBank, setAccount}){
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

    const signUpAction = e => {
        const formData = new FormData();
        formData.append('userId', id);
        formData.append('userPw', pw);
        formData.append('phone', phone);
        formData.append('bank', bank);
        formData.append('account', account);
    
        axios({
            method: "post",
            url: 'http://localhost:8090/signup',
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
            <div className='inputBoxArea' style={{ marginTop: isToggled !== "login" ? "-100px" : "0"}}>
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
                        inputTitle="Phone Number"
                        placeholder="Enter your phone number except '-'"
                        isToggled={isToggled}
                        inputValue={phone}
                        boxName="phone"
                        setFunc={setPhone}
                    />
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
                    <div style={{marginBottom : "-55px"}}></div>
                </div>
            )}
            <div className='button' 
                onClick={isToggled === "login" ? loginAction : signUpAction}
            >
                {mainTitle} {'>'}
            </div>
                
                
            
        </div> 
    );
}

export default RightContent;