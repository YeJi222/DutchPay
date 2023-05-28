import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RightContent({mainTitle, isToggled, setIsToggled, id, pw, phone, bank, account, setId, setPw, setPhone, setBank, setAccount}){    
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

        if(id != "" && pw != "" && phone != "" && bank != "" && account != ""){
            axios({
                method: "post",
                url: 'http://localhost:8090/signup',
                data: formData
            })
            .then(function(response){
                if(response.data === "signUp success"){
                    // 알림창 띄우고, login 화면으로
                    let timerInterval;
                    Swal.fire({
                        title: '회원가입 완료!',
                        html: '로그인 화면으로 이동합니다 :) ',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            setIsToggled("login");
                        }
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            })
        } else{
            // 빈칸 없도록 예외처리하기 
        }
    
        
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