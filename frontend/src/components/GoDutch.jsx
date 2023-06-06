import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import GoDutchLeftContent from './GoDutchLeftContent';
import GoDutchRightContent from './GoDutchRightContent';
import PhoneBox from './PhoneBox';
import GoDutchResult from './GoDutchResult';
import GoDutchMessage from './GoDutchMessage';

function GoDutch(){
    const navigate = useNavigate();
    const location = useLocation();

    const groupId = location.state.groupId;
    const [userInfo, setUserInfo] = useState(location.state.userInfo);
    const [inputMoney, setInputMoney] = useState();
    const [phoneBoxes, setPhoneBoxes] = useState([{array: <PhoneBox phone_id="0"/>, value: ""}]);
    const [isResult, setIsResult] = useState(false);
    // const [resultMembers, setResultMembers] = useState();

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

    // console.log("go dutch", resultMembers);
    console.log("groupId in GoDutch", groupId);

    // 세션 정보 관리 
    useEffect(() => {
        if(sessionData === null || userInfo === null){
            let timerInterval;
            Swal.fire({
                title: '세션 정보가 없습니다!',
                html: '다시 로그인해주세요 :) ',
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
                if (result.dismiss === Swal.DismissReason.timer) {
                    navigate('/');
                }
            })
        } else{
            const sessionUserId = sessionData.userId;
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
        }
    }, []);

    const logoutAction = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const backAction = () => {
        navigate('/main', {state: userInfo})
    };

    if(sessionData != null && userInfo != null){
        return(
            <div className='page'>
                <header>
                    <img src="/images/logo.png" className='logoImg'/>
                    <span className='title'>Dutch Pay</span>
                </header>
                <div className='backBtn' onClick={backAction}>
                    {'<'} Back
                </div>
                <div className='mainLogoutArea' onClick={logoutAction}>
                    Log-out
                </div>
    
                <div className='mainCenterWrapper'>
                    {/* left content */}
                    {isResult === false ? (
                        <GoDutchLeftContent
                            inputMoney={inputMoney}
                            setInputMoney={setInputMoney}
                            phoneBoxes={phoneBoxes}
                            setPhoneBoxes={setPhoneBoxes}
                        />
                    ) : (
                        <GoDutchResult
                            groupId={groupId}
                            inputMoney={inputMoney}
                            isResult={isResult}
                            // resultMembers={resultMembers}
                        />
                    )}
                    
                    
                    
    
                    {/* right content */}
                    {isResult === false ? (
                        <GoDutchRightContent
                            groupId={groupId}
                            userInfo={userInfo}
                            inputMoney={inputMoney}
                            setInputMoney={setInputMoney}
                            phoneBoxes={phoneBoxes}
                            userId={sessionData.userId}
                            setIsResult={setIsResult}
                            // setResultMembers={setResultMembers}
                            // setPhoneBoxes={setPhoneBoxes}
                        />
                    ) :
                    (
                        <GoDutchMessage/>
                    )}
                    
                    {/* <GoDutchMessage/> */}
                </div>
            </div>
        )
    }
}

export default GoDutch;