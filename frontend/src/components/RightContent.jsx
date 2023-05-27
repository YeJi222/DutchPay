import React from 'react';
import InputBox from './InputBox';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RightContent({mainTitle, isToggled, id, pw, setId, setPw}){
    const loginAction = e => {
        const formData = new FormData();
        formData.append('id', {id});
        formData.append('pw', {pw});
    
        axios({
            method: "post",
            url: 'http://localhost:8090',
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
            <div className='inputBoxArea'>
                <InputBox
                    inputTitle="Phone Number"
                    boxTitleText="ID"
                    placeholder="010-1234-5678"
                    isToggled={isToggled}
                    inputValue={id}
                    setFunc={setId}
                />
                <InputBox
                    inputTitle="Password"
                    boxTitleText="PW"
                    placeholder="*******"
                    isToggled={isToggled}
                    inputValue={pw}
                    setFunc={setPw}
                />
            </div>
            <div className='button' onClick={loginAction}>
                {mainTitle} {'>'}
            </div>
        </div> 
    );
}

export default RightContent;