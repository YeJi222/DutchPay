import React from 'react';
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";

function ConfirmLeftContent(props){
    const navigate = useNavigate();

    return(
        <div className='mainLeftPart' style={{ backgroundColor: props.isToggled === "receive" ? "#FFF6F6" : "#E3EAFF" }}>
            <div className='mainLeftTopText'>
                정산 현황 확인
            </div>
            <div className='userInfo'>
                받는 계좌 정보 <br></br>
                Bank : {props.bank}<br></br>
                Account : {props.account}<br></br>
            </div>
            <div className='mainLeftBottomText'>
                정산 미완료: {props.onLen}명<br></br>
                정산 완료 : {props.offLen}명<br></br>
                <br></br>
                총 받을 금액 : {props.sumMoney}원<br></br>
                받은 금액 : {props.sumMoney}원<br></br>
                남은 금액 : {props.sumMoney}원<br></br>
            </div>
        </div>    
    );
}

export default ConfirmLeftContent;