import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import PhoneBox from './PhoneBox';
import Swal from "sweetalert2";

function GoDutchResult(props){
    const navigate = useNavigate();
    const location = useLocation();
    const [memberInfo, setMemberInfo] = useState();
    
    const storedData = localStorage.getItem('user');
    const sessionData = JSON.parse(storedData);

    // console.log("storedData : ", sessionData);
    // console.log("userId : ", sessionData.userId);
    // console.log("userPw : ", sessionData.userPw);

    useEffect(() => {
        if(sessionData === null || memberInfo === null){
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
                url: 'http://localhost:8090/getMemberInfo',
                data: formData
            })
            .then(function(response){
                // setMemberInfo(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }, []);

    return(
        <div className='goDutchLeftPart'>
            <div className='mainLeftTopText'>
                정산결과
            </div>
            <hr className='goDutchHr'></hr>
            <p className='explainText' style={{textAlign: "center"}}>
                사람마다 디테일한 금액을 조정할 수 있습니다! <br></br>
                금액을 변경한 후, 'update' 버튼을 눌러주세요!
            </p>

            <div className='dutchResult'>
                <div className='resultSubTitle'>Member 1</div>
                <span className='phoneInfoBox'>
                    010-1111-1111
                </span>
                <span>
                    <input className='individualMoneyBox' value={333}></input>
                </span>
                <span className='updateBtn'>Update</span>
            </div>

            <div className='goDutchLeftBottomText'>
                총 인원 : 명<br></br>
                정산 금액 : {props.inputMoney}원
            </div>
        </div>

        
    );
}

export default GoDutchResult;