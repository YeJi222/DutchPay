import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RightContent(props){    
    const navigate = useNavigate();

    const loginAction = e => {
        const formData = new FormData();
        formData.append('userId', props.id);
        formData.append('userPw', props.pw);
    
        if(props.id === ""){
            console.log("no id");
            props.setConfirmId("no");
        } else{
            props.setConfirmId("yes");
        }
        if(props.pw === ""){
            console.log("no pw");
            props.setConfirmPw("no");
        } else{
            props.setConfirmPw("yes");
        }
        if(props.id != "" && props.pw != ""){
            console.log("ok");
            props.setConfirmId("yes");
            props.setConfirmPw("yes");

            axios({
                method: "post",
                url: 'http://localhost:8090/login',
                data: formData
            })
            .then(function(response){
                console.log(response.data);
                if(response.data === "login success"){
                    // 세션 저장 & 메인 화면으로 이동
                    localStorage.setItem('userId', props.id);
                    localStorage.setItem('userPw', props.pw);

                    const userData = { userId: props.id, userPw: props.pw };
                    localStorage.setItem('user', JSON.stringify(userData));

                    const storedData = localStorage.getItem('user');
                    const sessionData = JSON.parse(storedData);
                    console.log("storedData : ", sessionData);
                    console.log("userId : ", sessionData.userId);
                    console.log("userPw : ", sessionData.userPw);

                    navigate('./main');
                } else if(response.data === "wrong password"){
                    // 패스워드 재확인 요청
                    let timerInterval;
                    Swal.fire({
                        title: '로그인 실패',
                        html: '비밀번호를 다시 확인해주세요 :) ',
                        timer: 1300,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {}
                    })
                } else if(response.data === "no-existing member"){
                    // 아이디 재확인 요청
                    let timerInterval;
                    Swal.fire({
                        title: '로그인 실패',
                        html: '아이디를 다시 확인해주세요 :) ',
                        timer: 1300,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {}
                    })
                }
            })
            .catch(function(error){
                console.log(error);
            })
        }
        
    }

    const signUpAction = e => {
        const formData = new FormData();
        formData.append('userId', props.id);
        formData.append('userPw', props.pw);
        formData.append('phone', props.phone);
        formData.append('bank', props.bank);
        formData.append('account', props.account);

        if(props.id != "" && props.pw != "" && props.phone != "" && props.bank != "" && props.account != ""){
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
                            props.setIsToggled("login");
                        }
                    })
                } else if(response.data === "existing member"){
                    let timerInterval;
                    Swal.fire({
                        title: '이미 등록된 회원입니다',
                        html: '기존의 아이디로 로그인 해주세요 :) ',
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
                            // setIsToggled("login");
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
            <div className='mainTitle' style={{ color: props.isToggled === "login" ? "#FFF6F6" : "#ABBFFF" }}>
                {props.mainTitle}
            </div>
            <div className='inputBoxArea' style={{ marginTop: props.isToggled !== "login" ? "-100px" : "0"}}>
                <InputBox
                    inputTitle="ID"
                    boxTitleText="ID"
                    placeholder="Enter your ID"
                    isToggled={props.isToggled}
                    inputValue={props.id}
                    boxName="id"
                    setFunc={props.setId}
                    confirmInput={props.confirmId}
                />
                <InputBox
                    inputTitle="Password"
                    boxTitleText="PW"
                    placeholder="*******"
                    isToggled={props.isToggled}
                    inputValue={props.pw}
                    boxName="pw"
                    setFunc={props.setPw}
                    confirmInput={props.confirmPw}
                />
            </div>
            {props.isToggled === "login" ? (
                <div></div>
            ) : 
            (
                <div className='inputBoxArea'>
                    <InputBox
                        inputTitle="Phone Number"
                        placeholder="Enter your phone number except '-'"
                        isToggled={props.isToggled}
                        inputValue={props.phone}
                        boxName="phone"
                        setFunc={props.setPhone}
                    />
                    <InputBox
                        inputTitle="Bank"
                        placeholder="Enter your bank name"
                        isToggled={props.isToggled}
                        inputValue={props.bank}
                        boxName="bank"
                        setFunc={props.setBank}
                    />
                    <InputBox
                        inputTitle="Account"
                        placeholder="Enter your account"
                        isToggled={props.isToggled}
                        inputValue={props.account}
                        boxName="account"
                        setFunc={props.setAccount}
                    />
                    <div style={{marginBottom : "-55px"}}></div>
                </div>
            )}
            <div className='button' 
                onClick={props.isToggled === "login" ? loginAction : signUpAction}
            >
                {props.mainTitle} {'>'}
            </div>
        </div> 
    );
}

export default RightContent;