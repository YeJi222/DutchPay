import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import ConfirmLeftContent from './ConfirmLeftContent';
import ConfirmRightContent from './ConfirmRightContent';

import { useNavigate, useLocation  } from "react-router-dom";

function Confirm(){
    const navigate = useNavigate();
    const location = useLocation();

    console.log("state: ", location.state);

    const [isMainToggled, setIsMainToggled] = useState("receive");
    const [userInfo, setUserInfo] = useState(location.state);

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

    // console.log("storedData : ", sessionData);
    // console.log("userId : ", sessionData.userId);
    // console.log("userPw : ", sessionData.userPw);

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
            // const sessionUserId = sessionData.userId;
            // const formData = new FormData();
            // formData.append('sessionUserId', sessionUserId);

            // axios({
            //     method: "post",
            //     url: 'http://localhost:8090/getUserInfo',
            //     data: formData
            // })
            // .then(function(response){
            //     // console.log(response.data.dutchMoneyList);
            //     setUserInfo(response.data);
            //     console.log("axios", userInfo);
            // })
            // .catch(function(error){
            //     console.log(error);
            // })
        }
    }, []);

    const backAction = () => {
        navigate('/main', {state: userInfo})
    };

    const logoutAction = () => {
        localStorage.removeItem('user');
        navigate('/');
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
            <div className='backBtn' onClick={backAction}>
                {'<'} Back
            </div>
            <div className='mainLogoutArea' onClick={logoutAction}>
                Log-out
            </div>

            <div className='mainCenterWrapper'>
                {/* left content */}
                <ConfirmLeftContent
                    userInfo={userInfo}
                    isToggled={isMainToggled}
                    userId={userInfo.userId}
                    userPw={userInfo.userPw}
                    phone={userInfo.phone}
                    bank={userInfo.bank}
                    account={userInfo.account}
                    onLen={userInfo.onLen}
                    offLen={userInfo.offLen}
                    sumMoney={userInfo.sumMoney}
                />

                {/* right content */}
                <ConfirmRightContent
                    toggleTitle="receive"
                    isToggled={isMainToggled}
                    onLen={userInfo.onLen}
                    offLen={userInfo.offLen}
                    groupsEntityList={userInfo.groupsEntityList}
                    memberLen={userInfo.memberLen}
                    titleList={userInfo.setTitleList}
                    dutchMoneyList={userInfo.dutchMoneyList}
                /> 
            </div>
        </div>
    )
}

export default Confirm;