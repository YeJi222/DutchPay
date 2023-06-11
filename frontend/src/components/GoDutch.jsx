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
    const [insertPhones, setInsertPhones] = useState(false);
    const [memberInfo, setMemberInfo] = useState();

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

    // console.log("go dutch", resultMembers);
    console.log("groupId in GoDutch", groupId);

    // 세션 정보 관리 
    useEffect(() => {
        if(sessionData === null || userInfo === null || groupId === null){
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

    const clickNextBtn = (e) => {
        var phoneBlankCheck = true;
        var phoneFormatCheck = true;
        var phoneValueList = [];

        phoneBoxes.map((box, index) => {
            phoneValueList.push(JSON.stringify(box.value).substring(1, JSON.stringify(box.value).length - 1)); // 숫자만 들어가게 
            // console.log(box);
            // console.log("clickDutchPayBtn", JSON.stringify(box.value).length);
            if(JSON.stringify(box.value).length === 2){ // blank
                // console.log("clickDutchPayBtn", JSON.stringify(box.value));
                phoneBlankCheck = false;
            }
            console.log("clickNextBtn", JSON.stringify(box.value).length);
            if(JSON.stringify(box.value).length != 13){ // validation(전화번호 : 11자리)
                phoneFormatCheck = false;
                let timerInterval;
                Swal.fire({
                    title: '전화번호 형식이 맞지 않습니다',
                    html: '입력한 전화번호를 다시 한 번 확인해주세요 :) ',
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
                    if (result.dismiss === Swal.DismissReason.timer) {}
                })
            }
        });

        console.log("phoneBlankCheck", phoneBlankCheck);
        if(phoneBlankCheck === false){
            let timerInterval;
            Swal.fire({
                title: '전화번호 입력에 빈칸이 있습니다',
                html: '빈칸이 있는 전화번호 란을 지우거나, 채운 후 입력해주세요 :) ',
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
                if (result.dismiss === Swal.DismissReason.timer) {}
            })
        } else{
            if(phoneFormatCheck === true){
                var members = phoneValueList;

                // db에 insert
                const formData = new FormData();
                formData.append('groupId', groupId);
                formData.append('members', members);

                axios({
                    method: "post",
                    url: 'http://localhost:8090/createMembers',
                    data: formData
                })
                .then(function(response){
                    setInsertPhones(true);
                    // console.log("response", response.data);
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        }
    }

    if(sessionData != null && userInfo != null && groupId != null){
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
                    {insertPhones === false ? (
                        <GoDutchLeftContent
                            groupId={groupId}
                            inputMoney={inputMoney}
                            setInputMoney={setInputMoney}
                            phoneBoxes={phoneBoxes}
                            setPhoneBoxes={setPhoneBoxes}
                            setInsertPhones={setInsertPhones}
                        />
                    ) : (
                        <GoDutchResult
                            groupId={groupId}
                            memberInfo={memberInfo}
                            insertPhones={insertPhones}
                            setMemberInfo={setMemberInfo}
                            inputMoney={inputMoney}
                            isResult={isResult}
                            // resultMembers={resultMembers}
                        />
                    )}

                    {insertPhones === true ? (
                        isResult === false ? (
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
                        )
                        ) : (
                            <div className='nextBtn' onClick={clickNextBtn}>
                                Next {'>'}
                            </div>
                        )
                    }
                    
                    
                    
    
                    {/* right content */}
                    {/* {isResult === false ? (
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
                    )} */}

                    {/* <GoDutchMessage/> */}
                </div>
            </div>
        )
    }
}

export default GoDutch;