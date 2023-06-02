import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import GoDutchLeftContent from './GoDutchLeftContent';
import GoDutchRightContent from './GoDutchRightContent';

function GoDutch(){
    const navigate = useNavigate();
    const location = useLocation();

    const [isMainToggled, setIsMainToggled] = useState("receive");
    const [userInfo, setUserInfo] = useState(location.state);

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

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
                    <GoDutchLeftContent/>
    
                    {/* right content */}
                    <GoDutchRightContent
                        toggleTitle="receive"
                        isToggled={isMainToggled}
                        onLen={userInfo.onLen}
                        offLen={userInfo.offLen}
                        groupsEntityList={userInfo.groupsEntityList}
                    /> 
                </div>
            </div>
        )
    }
}

export default GoDutch;