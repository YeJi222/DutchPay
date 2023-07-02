import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation  } from "react-router-dom";

function ConfirmLeftContent(props){
    const navigate = useNavigate();
    const location = useLocation();

    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

    const groupInfo = props.groupInfo;

    console.log("groupInfo: ", groupInfo);

    useEffect(() => {
        if(sessionData === null){
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
            // formData.append('groupId', groupId);

            // axios({
            //     method: "post",
            //     url: 'http://localhost:8090/getGroupUserInfo',
            //     data: formData
            // })
            // .then(function(response){
            //     console.log(response.data);
            //     setGroupInfo(response.data);
            //     console.log("group Info", groupInfo);
            // })
            // .catch(function(error){
            //     console.log(error);
            // })
        }
    }, []);

    var yesCount = 0;
    var yesMoney = 0;
    var noCount = 0;
    if(groupInfo != undefined){
        return(
            <div className='mainLeftPart' style={{ backgroundColor: props.isToggled === "receive" ? "#FFF6F6" : "#E3EAFF" }}>
                <div className='confirmLeftTopText'>
                    정산 일자 : {groupInfo.timestamp}
                </div>
                <div className='userInfo'>
                    (받는 계좌 정보) <br></br>
                    Bank : {groupInfo.userBank}<br></br>
                    Account : {groupInfo.userAccount}<br></br>
                </div>
                <div className='mainLeftBottomText'>
                    <div>
                        {groupInfo.membersInfo.map((members, idx) => {
                            if (members.sendState === 'yes') {
                                yesCount += 1;
                                yesMoney += Number(members.nmoney);
                            } else {
                                noCount += 1;
                            }
                        })}
                    </div>
                    

                    정산 미완료: {noCount}명<br></br>
                    정산 완료 : {yesCount}명<br></br>
                    <br></br>
                    총 받을 금액 : {groupInfo.totalMoney}원<br></br>
                    받은 금액 : {yesMoney}원<br></br>
                    남은 금액 : {groupInfo.totalMoney - yesMoney}원<br></br>
                </div>
            </div>    
        );
    }
}

export default ConfirmLeftContent;