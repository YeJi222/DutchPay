import React from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";

function MainLeftContent(props){
    const navigate = useNavigate();

    const goDucthPay = e =>{
        navigate('./goDutch');
    }

    const sendMessage = e => {
        axios({
            method: "post",
            url: 'http://localhost:8090/sendMessage',
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className='mainLeftPart' style={{ backgroundColor: props.isToggled === "receive" ? "#FFF6F6" : "#E3EAFF" }}>
            <div className='mainLeftTopText'>
                {props.userId} 님 Wallet
            </div>
            <div className='goDutchBtn' onClick={goDucthPay}>
                정산하기
            </div>
            <div className='userInfo'>
                Phone: {props.phone}<br></br>
                Bank : {props.bank}<br></br>
                Account : {props.account}<br></br>
            </div>
            <div className='pigImgArea'>
                    <img src="/images/pig.png" className='pigMainImg'></img>
            </div>
            <div className='goDutchBtn' onClick={sendMessage}>
                문자 보내기
            </div>
            <div className='mainLeftBottomText'>
                진행중: {props.onLen}건<br></br>
                정산 완료 : {props.offLen}건<br></br>
                총 받은 금액 : {props.sumMoney}원<br></br>
            </div>
        </div>    
    );
}

export default MainLeftContent;